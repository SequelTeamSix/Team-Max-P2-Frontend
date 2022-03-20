import { useNavigate } from "react-router-dom";

export default function Landing() {
  let navigate = useNavigate();

  return (
    <div className="modal">
      <h1 className="company-title">Maxtermind Inc</h1>
      <div className="landing-page-button-container">
        {/* TODO: Need to figure out if these should route to separate components */}
        <button className="button" onClick={() => navigate("/signIn")}>
          Admin Login
        </button>
        <hr className="horizontal-break" />
        {/* TODO: Need to figure out if these should route to separate components */}
        <button className="button" onClick={() => navigate("/signIn")}>
          Employee Login
        </button>
      </div>
      <p>Terms of use | Privacy Policy</p>
    </div>
  );
}
