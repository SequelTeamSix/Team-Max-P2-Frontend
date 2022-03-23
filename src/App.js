import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import { EmployeeProfile } from "./components/EmployeeProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/AdminPage";
import AdminLogin from "./components/AdminLogin";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Any routes that require the user to be signed in go here  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
