import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Notification from "./Notification";
import Bell from "../assets/bell_32.png";

export function EmployeeProfile() {
  const { currentUser, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const [employee, setEmployee] = useState();
  useEffect(() => setEmployee(currentUser), [currentUser]);

  const [positions, setPositions] = useState([]);
  useEffect(() => getOpenPositions(), [employee]);

  function getOpenPositions() {
    setLoading(true);
    fetch("http://localhost:3000/position/open", {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        const p = data
          .map((position) => ({
            ...position,
            selected: false,
          }))
          .filter((position) => {
            if (currentUser.applications) {
              return !currentUser.applications.some(
                (app) => app.position === position.id
              );
            }
            return position;
          });
        console.log(p);
        setPositions(p);
      })
      .catch((e) => {
        console.log("Failed to retrieve open positions");
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  function applyForPosition() {
    // ensure there is a position and candidate selected
    if (getSelectedPositionsCount()) {
      const selectedPosition =
        positions[positions.findIndex((p) => p.selected)];
      const selectedPositionId = selectedPosition.id;
      const selectPositionManagerId =
        typeof selectedPosition.manager === "object"
          ? selectedPosition.manager.id
          : selectedPosition.manager;
      fetch(
        `http://localhost:3000/action/recommended/${selectedPositionId}/${selectPositionManagerId}/${employee.id}`,
        {
          mode: "no-cors",
        }
      )
        .then((res) => res)
        .then((data) => {
          login(employee.email, employee.password);
        })
        .catch((e) => {
          console.log("Failed to apply for position");
          console.log(e);
        });
    }
  }

  function getSelectedPositionsCount() {
    return positions.filter((p) => p.selected).length;
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

  return employee ? (
    <div className="large-modal">
      <div className="employee-profile-left">
        <div className="employee-profile-top">
          <div className="profile-image">
            <img
              src={
                employee.photo
                  ? employee.photo
                  : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              }
              alt="You!"
            />
          </div>
          <h2>
            {employee.firstName} {employee.lastName}
          </h2>
        </div>
        <div className="employee-profile-bottom">
          <div className="employee-information-container">
            <h3 className="employee-information-title">Employee Information</h3>
            <div className="role-preferences-container">
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Employee Id</p>
                  <p>{employee.id}</p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Full Name</p>
                  <p>
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Email</p>
                  <p>{employee.email}</p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Phone #</p>
                  <p>{employee.phoneNumber}</p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Current Role</p>
                  <p>{employee.position.name}</p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Start Date</p>
                  <p>{employee.startDate}</p>
                </div>
              </div>
              <div className="add-role-preference-container">
                <div className="role-preference-element">
                  <p>Supervisor</p>
                  <p>
                    {/* Some employees do not have a manager */}
                    {employee.position.manager
                      ? `${employee.position.manager.firstName} ${employee.position.manager.lastName}`
                      : "none"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employee-profile-right">
        <div className="employee-profile-top-right">
          <OverlayTrigger
            trigger="click"
            key="left"
            placement="left"
            overlay={
              <Popover id={`popover-positioned-left`}>
                <Popover.Header as="h3">{`Notifications`}</Popover.Header>
                <Popover.Body className="popover-notifications">
                  {employee.notifications ? (
                    employee.notifications.map((noti) => (
                      <Notification {...noti} />
                    ))
                  ) : (
                    <h4>No notifications</h4>
                  )}
                </Popover.Body>
              </Popover>
            }
          >
            <Button className="button-sm">
              <img src={Bell} alt="notification bell" />
            </Button>
          </OverlayTrigger>
          <Link style={{ textDecoration: "none" }} to="/profile/applications">
            <div className="link-button">My Applications</div>
          </Link>
          <button className="button-sm" onClick={logout}>
            Sign Out
          </button>
        </div>
        <div className="employee-profile-bottom">
          <div className="employee-information-container">
            <h3>Current eligible positions</h3>
            {loading ? (
              <Spinner
                style={{ marginLeft: "10rem", marginTop: "3rem" }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : positions ? (
              <div className="positions-container">
                {positions.map((position, i) => (
                  <div className="add-role-preference-container">
                    <div
                      className={
                        position.selected
                          ? "role-preference-element-selected"
                          : "role-preference-element"
                      }
                      onClick={() => toggleSelectedPosition(i)}
                    >
                      <p>{position.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No current positions</div>
            )}
          </div>
          <button
            disabled={getSelectedPositionsCount() > 0 ? false : true}
            className="button"
            style={{ alignSelf: "end" }}
            onClick={() => applyForPosition()}
          >
            Apply for position
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
