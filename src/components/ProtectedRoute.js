import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Landing from "./Landing";

export default function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Landing />;
}
