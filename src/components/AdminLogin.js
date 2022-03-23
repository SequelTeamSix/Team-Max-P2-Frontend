import { useState } from "react";
import eye from "../assets/eye-small.png";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const { adminLogin } = useAuth();

  return (
    <div className="modal">
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
      <button className="button" onClick={() => adminLogin(username, password)}>
        Login
      </button>
      <p>Terms of use | Privacy Policy</p>
    </div>
  );
}
