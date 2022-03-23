import { useAuth } from "../contexts/AuthContext";

export default function AdminPage() {
  const { logout } = useAuth();
  return (
    <div className="admin-large-modal">
      <div className="admin-top-container">
        <div className="admin-top-container-left">
          <div className="admin-top-container-left-elements">
            <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
            <p>employee name</p>
          </div>
        </div>
        <div className="admin-top-container-right">
          <div className="admin-top-container-right-elements">
            <button className="button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="admin-main-container">
        <div className="admin-main-container-left">
          <div className="admin-main-container-title">
            <h3>Current Open Positions</h3>
          </div>
          <div className="admin-table-container">
            <div className="role-preferences-container">
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p>Place Open Positions</p>
                </div>
              </div>
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p>Place Open Positions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-main-container-right">
          <div className="admin-main-container-title">
            <h3>Candidates</h3>
          </div>
          <div className="admin-table-container">
            <div className="role-preferences-container">
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p>Candidates Show Here</p>
                </div>
              </div>
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p>Candidates Show Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
