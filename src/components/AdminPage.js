import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function AdminPage() {
  const { currentUser, logout } = useAuth();
  // use for adding loading spinner and disabling selections while api call is being made
  const [loadingPositions, setLoadingPostions] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const [positions, setPositions] = useState([]);
  useEffect(() => getOpenPositions(), []);

  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const selectedPositionIndex = positions.findIndex((p) => p.selected);
    // If a position is currently selected, update the applications list
    if (selectedPositionIndex >= 0) {
      setLoadingApplications(true);
      const selectedPositionId = positions[selectedPositionIndex].id;
      fetch(
        `https://maxtermindapp1-backend.azurewebsites.net/application/position/${selectedPositionId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let a = [];
          if (data.length) {
            a = data
              .map((app) => ({
                ...app,
                currentlySelected: false,
              }))
              .filter(
                // (app) => !app.recommended && !app.rejected && !app.approved
                (app) => !app.rejected && !app.approved
              );
          }
          setApplications(a);
        })
        .catch((e) => {
          console.log("Failed to retrieve open positions");
          console.log(e);
        })
        .finally(() => setLoadingApplications(false));
    } else {
      setApplications([]);
    }
  }, [positions]);

  function getSelectedApplicationsCount() {
    return applications.filter((a) => a.currentlySelected).length;
  }

  function getSelectedPositionsCount() {
    return positions.filter((p) => p.selected).length;
  }

  function notifyCandidate() {
    // ensure there is a position and candidate selected
    if (getSelectedApplicationsCount() && getSelectedPositionsCount()) {
      const selectedPosition =
        positions[positions.findIndex((p) => p.selected)];
      const selectedPositionId = selectedPosition.id;
      const selectPositionManagerId = selectedPosition.manager.id;
      const selectedCandidateId =
        applications[applications.findIndex((c) => c.selected)].id;
      fetch(
        `https://maxtermindapp1-backend.azurewebsites.net/action/recommended/${selectedPositionId}/${selectPositionManagerId}/${selectedCandidateId}`
      )
        .then((res) => res.json())
        .then((data) => {
          getOpenPositions();
        })
        .catch((e) => {
          console.log("Failed to notify candidate");
          console.log(e);
        });
    }
  }

  function getOpenPositions() {
    setLoadingPostions(true);
    fetch("https://maxtermindapp1-backend.azurewebsites.net/position/open")
      .then((res) => res.json())
      .then((data) => {
        const p = data.map((position) => ({
          ...position,
          selected: false,
        }));
        console.log(p);
        setPositions(p);
      })
      .catch((e) => {
        console.log("Failed to retrieve open positions");
        console.log(e);
      })
      .finally(() => setLoadingPostions(false));
  }

  function approveApplication() {
    if (getSelectedApplicationsCount() && getSelectedPositionsCount()) {
      const selectedApplication = applications.find((a) => a.currentlySelected);
      console.log("selected application");
      console.log(selectedApplication);

      fetch(
        `https://maxtermindapp1-backend.azurewebsites.net/action/approved/${selectedApplication.id}/${selectedApplication.position.manager.id}`
      )
        .then((res) => res)
        .then((data) => getOpenPositions())
        .catch((e) => {
          console.log("Failed to aprove application");
          console.log(e);
        });
    }
  }

  function rejectApplication() {
    if (getSelectedApplicationsCount() && getSelectedPositionsCount()) {
      const selectedApplication = applications.find((a) => a.currentlySelected);
      console.log("selected application");
      console.log(selectedApplication);

      fetch(
        `https://maxtermindapp1-backend.azurewebsites.net/action/rejected/${selectedApplication.id}/${selectedApplication.position.manager.id}`
      )
        .then((res) => res)
        .then((data) => getOpenPositions())
        .catch((e) => {
          console.log("Failed to reject application");
          console.log(e);
        });
    }
  }

  function toggleSelectedApplication(i) {
    const numSelected = getSelectedApplicationsCount();
    const currentSelectedIndex = applications.findIndex(
      (a) => a.currentlySelected
    );
    if (i === currentSelectedIndex) {
      setApplications((oldApplications) => {
        const newApplications = [...oldApplications];
        newApplications[currentSelectedIndex].currentlySelected = false;
        return newApplications;
      });
    } else if (numSelected > 0) {
      setApplications((oldApplications) => {
        const newApplications = [...oldApplications];
        newApplications[currentSelectedIndex].currentlySelected = false;
        newApplications[i].currentlySelected = true;
        return newApplications;
      });
    } else {
      setApplications((oldApplications) => {
        const newApplications = [...oldApplications];
        newApplications[i].currentlySelected = true;
        return newApplications;
      });
    }
  }

  function toggleSelectedPosition(i) {
    const numSelected = getSelectedPositionsCount();
    const currentSelectedIndex = positions.findIndex((p) => p.selected);
    if (i === currentSelectedIndex) {
      setPositions((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[currentSelectedIndex].selected = false;
        return newPositions;
      });
    } else if (numSelected > 0) {
      setPositions((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[currentSelectedIndex].selected = false;
        newPositions[i].selected = true;
        return newPositions;
      });
    } else {
      setPositions((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[i].selected = true;
        return newPositions;
      });
    }
  }

  return positions ? (
    <div className="admin-large-modal">
      <div className="admin-top-container">
        <div className="admin-top-container-left">
          <div className="admin-top-container-left-elements">
            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
            <h5>{`${currentUser.firstName} ${currentUser.lastName}`}</h5>
          </div>
        </div>
        <div className="admin-top-container-right">
          <div className="admin-top-container-right-elements">
            <button className="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="admin-main-container">
        <div className="admin-main-container-left">
          <div className="admin-main-container-title">
            <h3>Open Positions</h3>
          </div>
          <div className="admin-table-container">
            {loadingPositions ? (
              <Spinner
                style={{ marginLeft: "13rem", marginTop: "3rem" }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : positions ? (
              <div className="role-preferences-container">
                {positions.map((position, i) => (
                  <div
                    className="admin-add-role-preference-container"
                    onClick={() => {
                      toggleSelectedPosition(i);
                    }}
                  >
                    <div
                      className={
                        position.selected
                          ? "role-preference-element-selected"
                          : "role-preference-element"
                      }
                    >
                      <p>{position.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No open positions</div>
            )}
          </div>
        </div>
        <div className="admin-main-container-right">
          <div className="admin-main-container-title">
            <h3>Applications</h3>
          </div>
          <div className="admin-table-container">
            {loadingApplications ? (
              <Spinner
                style={{ marginLeft: "13rem", marginTop: "3rem" }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="role-preferences-container">
                {applications.length ? (
                  applications.map((application, i) => (
                    <div
                      className="admin-add-role-preference-container"
                      onClick={() => toggleSelectedApplication(i)}
                    >
                      <div
                        className={
                          application.currentlySelected
                            ? "role-preference-element-selected"
                            : "role-preference-element"
                        }
                      >
                        <p>{`${application.employee.firstName} ${application.employee.lastName}`}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="admin-add-role-preference-container">
                    <div className="role-preference-element">
                      <p>No applications</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="admin-button-container">
        <button
          disabled={
            !getSelectedPositionsCount() || !getSelectedApplicationsCount()
          }
          className="button"
          onClick={() => approveApplication()}
        >
          Approve
        </button>
        <button
          disabled={
            !getSelectedPositionsCount() || !getSelectedApplicationsCount()
          }
          className="button"
          onClick={() => rejectApplication()}
        >
          Reject
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
