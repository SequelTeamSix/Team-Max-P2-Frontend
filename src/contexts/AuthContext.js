import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  function updateUser(email, password) {
    const url = new URL(
      "https://maxtermindapp1-backend.azurewebsites.net/employee/login"
    );
    const params = { email, password };
    url.search = new URLSearchParams(params);

    fetch(url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          console.log(data);
        }
      })
      .catch((e) => {
        console.log("Failed to update user");
        console.log(e);
      });
  }

  function login(email, password) {
    const url = new URL(
      "https://maxtermindapp1-backend.azurewebsites.net/employee/login"
    );
    const params = { email, password };
    url.search = new URLSearchParams(params);

    // const url = `https://maxtermindapp1-backend.azurewebsites.net/employee/login?email=${email}&password=${password}`;

    fetch(url, {
      method: "POST",
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
    const url = new URL(
      "https://maxtermindapp1-backend.azurewebsites.net/employee/login"
    );
    const params = { email, password };
    url.search = new URLSearchParams(params);

    fetch(url, {
      method: "POST",
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

  const value = { currentUser, login, adminLogin, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
