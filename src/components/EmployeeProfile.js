import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Notification from "./Notification";

export function EmployeeProfile() {
  const { currentUser, login, logout } = useAuth();

  const [employee, setEmployee] = useState();
  useEffect(() => setEmployee(currentUser), [currentUser]);

  const [positions, setPositions] = useState([]);
  useEffect(() => getOpenPositions(), [employee]);

  function getOpenPositions() {
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
      });
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
        <div className="employee-profile-left-top">
          <div className="employee-profile-left-top-elements">
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
            <div className="employee-profile-left-top-elements">
              <h2>
                {employee.firstName} {employee.lastName}
              </h2>
            </div>
          </div>
        </div>
        <div className="employee-profile-left-bottom">
          <div className="employee-information-container">
            <div className="employee-information-title">
              <h3>Employee Information</h3>
            </div>
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
        <OverlayTrigger
          trigger="click"
          key="left"
          placement="left"
          overlay={
            <Popover id={`popover-positioned-left`}>
              <Popover.Header as="h3">{`Popover left`}</Popover.Header>
              <Popover.Body style={{ maxHeight: "200px", overflow: "scroll" }}>
                {employee.notifications.map((noti) => (
                  <Notification {...noti} />
                ))}
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Popover on left</Button>
        </OverlayTrigger>
        <Link to="/profile/applications">My Applications</Link>
        <button
          className="button"
          style={{ alignSelf: "end", margin: "2rem" }}
          onClick={logout}
        >
          Sign Out
        </button>
        <div className="employee-profile-left-bottom">
          <div className="employee-information-container">
            <h3>Current eligible positions</h3>
            {positions ? (
              positions.map((position, i) => (
                // determine how to display position
                // should be disabled if selected or rejected
                // otherwise give a checkbox to allow for it to be selected ?
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
              ))
            ) : (
              <div>No current positions</div>
            )}
          </div>
          <button className="button" onClick={() => applyForPosition()}>
            Apply for position
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
