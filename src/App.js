import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import { EmployeeProfile } from "./components/EmployeeProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/AdminPage";
import AdminLogin from "./components/AdminLogin";
import PageNotFound from "./components/PageNotFound";
import Applications from "./components/Applications";

function App() {
  return (
    <div className="app-container">
      <svg width="100%" height="100%" className="svg">
        <circle cx="0" cy="50%" r="50%" fill="#3F4D8E" />
        <circle cx="100%" cy="50%" r="50%" fill="#3875B1" />
      </svg>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Any routes that require the user to be signed in go here  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<EmployeeProfile />} />
            <Route path="/profile/applications" element={<Applications />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
