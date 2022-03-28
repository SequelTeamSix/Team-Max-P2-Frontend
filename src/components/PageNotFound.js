import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => setTimeout(() => navigate("/"), 3000), []);
  return (
    <div className="_404">
      <h4>404: Page not found</h4>
      <h4>redirecting...</h4>
      <Spinner
        style={{ marginTop: "3rem" }}
        animation="border"
        role="status"
      ></Spinner>
    </div>
  );
}
