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
    <div className="applications-container">
      <Link to="/profile">Return to profile</Link>
      <h1>My current applications</h1>
      {currentUser.applications.map((app) => (
        <div>
          <p>
            Date applied: {app.date} | Current Status: {determineStatus(app)}
          </p>
        </div>
      ))}
    </div>
  );
}
