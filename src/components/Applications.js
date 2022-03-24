import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Applications() {
  const { currentUser } = useAuth();
  return (
    <div className="applications-container">
      <Link to="/profile">Return to profile</Link>
      <h1>My current applications</h1>
      {currentUser.applications.map((app) => (
        <div>
          <p>
            Date applied: {app.date} | Current Status:{" "}
            {!app.rejected && !app.selected ? "pending" : "tbd"}
          </p>
        </div>
      ))}
    </div>
  );
}
