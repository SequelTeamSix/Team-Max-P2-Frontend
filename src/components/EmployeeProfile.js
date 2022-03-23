import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export function EmployeeProfile() {
  const ROLE_PREFERENCE_COUNT = 3;
  const rolePreferenceArr = [1, 2, 3]; // TODO: find a better way to do this
  const { currentUser, logout } = useAuth();
  const [employee, setEmployee] = useState();
  useEffect(() => setEmployee(currentUser), [currentUser]);
  const [positions, setPositions] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/position/open", {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPositions(data);
      })
      .catch((e) => {
        console.log("Failed to retrieve open positions");
        console.log(e);
      });
  }, []);

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
          </div>
          <div className="employee-profile-left-top-elements">
            <h2>
              {employee.firstName} {employee.lastName}
            </h2>
          </div>
        </div>
        <div className="employee-profile-left-bottom">
          <h3>Role Preferences</h3>
          <div className="role-preferences-container">
            {rolePreferenceArr.map((role, i) => (
              <div key={i} className="add-role-preference-container">
                <div className="role-preference-elements">
                  <p>Role {i + 1}</p>
                  <Form.Select aria-label="Default select example">
                    {positions?.map((position, i) => (
                      <option key={position.name} value={i}>
                        {position.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="employee-profile-right">
        <button
          className="button"
          style={{ alignSelf: "end" }}
          onClick={logout}
        >
          Sign Out
        </button>
        <div className="employee-information-title">
          <h3>Employee Information</h3>
        </div>
        <div className="employee-information-container">
          <div className="role-preferences-container">
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Employee Id</p>
                <p>{employee.id}</p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Full Name</p>
                <p>
                  {employee.firstName} {employee.lastName}
                </p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Email</p>
                <p>{employee.email}</p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Phone #</p>
                <p>{employee.phoneNumber}</p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Current Role</p>
                <p>{employee.position.name}</p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
                <p>Start Date</p>
                <p>{employee.startDate}</p>
              </div>
            </div>
            <div className="add-role-preference-container">
              <div className="role-preference-elements">
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
  ) : (
    <div></div>
  );
}
