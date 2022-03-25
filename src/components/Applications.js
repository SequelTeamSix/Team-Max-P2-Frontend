import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Applications() {
  const { currentUser } = useAuth();

  function determineText(app) {
    if (app.position) {
      return `Position: ${app.position.name} | Applied: ${app.date}`;
    } else {
      return `Applied: ${app.date}`;
    }
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
                <div
                  className="application-container"
                  style={{ marginBottom: "1em" }}
                >
                  {app.position && <p>{`Position: ${app.position.name}`}</p>}
                  <p>{`Applied: ${app.date}`}</p>
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
