import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  function login(email, password) {
    const url = new URL("http://localhost:3000/employee/login");
    const params = { email, password };
    url.search = new URLSearchParams(params);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          console.log(data);
          navigate("/profile");
        }
      })
      .catch((e) => {
        console.log("Incorrect Login");
        console.log(e);
      });
  }

  function adminLogin(email, password) {
    const url = new URL("http://localhost:3000/employee/login");
    const params = { email, password };
    url.search = new URLSearchParams(params);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          if (data.position.admin) {
            navigate("/admin");
          }
        }
      })
      .catch((e) => {
        console.log("Incorrect Login");
        console.log(e);
      });
  }

  function logout() {
    setCurrentUser({});
    navigate("/");
  }

  const value = { currentUser, login, adminLogin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
