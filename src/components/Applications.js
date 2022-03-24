import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Applications() {
  const { currentUser } = useAuth();

  function determineStatus(app) {
    let status = "";
    if (app.approved) {
      status = "approved";
    } else if (app.rejected) {
      status = "rejected";
    } else {
      status = "pending";
    }
    return status;
  }

  return (
    // <div className="applications-container">
    <div className="main-modal">
      <Link style={{ textDecoration: "none", alignSelf: "end" }} to="/profile">
        <div className="link-button">Profile</div>
      </Link>
      <div className="application-content">
        <h1 className="application-heading">My current applications</h1>
        <div className="application-element-container">
          {currentUser.applications ? (
            currentUser.applications
              .filter((app) => !app.rejected && !app.approved)
              .map((app) => (
                <div className="add-role-preference-container">
                  <p>
                    Date applied: {app.date} | Current Status:{" "}
                    {determineStatus(app)}
                  </p>
                </div>
              ))
          ) : (
            <div>No current applications</div>
          )}
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
