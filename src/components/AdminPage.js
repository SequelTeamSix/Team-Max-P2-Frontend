import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminPage() {
  const { currentUser, logout } = useAuth();
  // use for adding loading spinner and disabling selections while api call is being made
  const [loading, setLoading] = useState(false);

  const [positions, setPositions] = useState([]);
  useEffect(() => getOpenPositions(), []);

  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const selectedPositionIndex = positions.findIndex((p) => p.selected);
    // If a position is currently selected, update the candidates list
    if (selectedPositionIndex >= 0) {
      const selectedPositionId = positions[selectedPositionIndex].id;
      fetch(`http://localhost:3000/position/${selectedPositionId}`, {
        mode: "no-cors",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let c = [];
          if (data.applications) {
            c = data.applications
              .map((app) => ({
                ...app,
                selected: false,
              }))
              .filter(
                // (app) => !app.recommended && !app.rejected && !app.approved
                (app) => !app.rejected && !app.approved
              );
          }
          setCandidates(c);
        })
        .catch((e) => {
          console.log("Failed to retrieve open positions");
          console.log(e);
        });
    } else {
      setCandidates([]);
    }
  }, [positions]);

  function getSelectedCandidatesCount() {
    return candidates.filter((p) => p.selected).length;
  }

  function getSelectedPositionsCount() {
    return positions.filter((p) => p.selected).length;
  }

  function notifyCandidate() {
    // ensure there is a position and candidate selected
    if (getSelectedCandidatesCount() && getSelectedPositionsCount()) {
      const selectedPosition =
        positions[positions.findIndex((p) => p.selected)];
      const selectedPositionId = selectedPosition.id;
      const selectPositionManagerId = selectedPosition.manager.id;
      const selectedCandidateId =
        candidates[candidates.findIndex((c) => c.selected)].id;
      fetch(
        `http://localhost:3000/action/recommended/${selectedPositionId}/${selectPositionManagerId}/${selectedCandidateId}`,
        {
          mode: "no-cors",
        }
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
    fetch("http://localhost:3000/position/open", {
      mode: "no-cors",
    })
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
      });
  }

  function rejectApplication() {
    if (getSelectedCandidatesCount() && getSelectedPositionsCount()) {
      const selectedPosition =
        positions[positions.findIndex((p) => p.selected)];
      const positionId = selectedPosition.id;
      const managerId = selectedPosition.manager.id;
      const selectedCandidate =
        candidates[candidates.findIndex((c) => c.selected)];
      console.log("selected candidate");
      console.log(selectedCandidate);
      const applicationId = selectedCandidate.applications.find(
        (app) => positionId === app.position
      ).id;

      fetch(
        `http://localhost:3000/action/rejected/${applicationId}/${managerId}`,
        {
          mode: "no-cors",
        }
      )
        .then((res) => res)
        .then((data) => {})
        .catch((e) => {
          console.log("Failed to reject application");
          console.log(e);
        });
    }
  }

  function toggleSelectedCandidate(i) {
    const numSelected = getSelectedCandidatesCount();
    const currentSelectedIndex = candidates.findIndex((p) => p.selected);
    if (i === currentSelectedIndex) {
      setCandidates((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[currentSelectedIndex].selected = false;
        return newPositions;
      });
    } else if (numSelected > 0) {
      setCandidates((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[currentSelectedIndex].selected = false;
        newPositions[i].selected = true;
        return newPositions;
      });
    } else {
      setCandidates((oldPositions) => {
        const newPositions = [...oldPositions];
        newPositions[i].selected = true;
        return newPositions;
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
            <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          </div>
        </div>
        <div className="admin-top-container-right">
          <div className="admin-top-container-right-elements">
            <button className="button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="admin-main-container">
        <div className="admin-main-container-left">
          <div className="admin-main-container-title">
            <h3>Current Open Positions</h3>
          </div>
          <div className="admin-table-container">
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
          </div>
        </div>
        <div className="admin-main-container-right">
          <div className="admin-main-container-title">
            <h3>Candidates</h3>
          </div>
          <div className="admin-table-container">
            <div className="role-preferences-container">
              {candidates.length ? (
                candidates.map((candidate, i) => (
                  <div
                    className="admin-add-role-preference-container"
                    onClick={() => toggleSelectedCandidate(i)}
                  >
                    <div
                      className={
                        candidate.selected
                          ? "role-preference-element-selected"
                          : "role-preference-element"
                      }
                    >
                      <p>{`${candidate.employee.firstName} ${candidate.employee.lastName}`}</p>
                      <img
                        src={candidate.employee.photo}
                        alt="user"
                        style={{ width: "50px" }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="admin-add-role-preference-container">
                  <div className="role-preference-element">
                    <p>No candidates</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="button" onClick={() => notifyCandidate()}>
          Accept
        </button>
        <button className="button" onClick={() => rejectApplication()}>
          Reject
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
