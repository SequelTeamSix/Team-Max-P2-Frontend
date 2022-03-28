import { useState } from "react";
import { Spinner } from "react-bootstrap";
import eye from "../assets/eye-small.png";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  return (
    <div className="main-modal">
      {loading ? (
        <Spinner
          style={{ marginTop: "20rem" }}
          animation="border"
          role="status"
        ></Spinner>
      ) : (
        <>
          <h1 className="company-title">Maxtermind Inc</h1>
          <div className="sign-in-input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="sign-in-input-group">
            <label>Password</label>
            <div className="sign-in-input-group-password">
              <input
                className="password-input"
                type={hidePassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={eye}
                alt="toggle to hide password"
                onClick={() => setHidePassword((oldValue) => !oldValue)}
              ></img>
            </div>
          </div>
          <button
            className="button"
            onClick={() => {
              login(username, password);
              setLoading(true);
            }}
          >
            Login
          </button>
          <p>Terms of use | Privacy Policy</p>
        </>
      )}
    </div>
  );
}
