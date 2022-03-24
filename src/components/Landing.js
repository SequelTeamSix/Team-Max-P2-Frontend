import { useNavigate } from "react-router-dom";

export default function Landing() {
  let navigate = useNavigate();

  return (
    <div className="main-modal">
      <h1 className="company-title">Maxtermind Inc</h1>
      <div className="landing-page-button-container">
        <button className="button" onClick={() => navigate("/adminLogin")}>
          Admin Login
        </button>
        <hr className="horizontal-break" />
        <button className="button" onClick={() => navigate("/login")}>
          Employee Login
        </button>
      </div>
      <p>Terms of use | Privacy Policy</p>
    </div>
  );
}
