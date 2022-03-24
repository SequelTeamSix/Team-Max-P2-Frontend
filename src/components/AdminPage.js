import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export default function AdminPage() {

  let isClicked = false;
  const candidates = ["William Turner", "Abraham O'Thompson", "Carmichael McNeil", "Brittany Taggerty"];
  let random = Math.random(candidates.length);

  function showCandidates() {
    
      let p1 = document.getElementById('candidate-one');
      p1.hidden = false;

      let p2 = document.getElementById('candidate-two');
      p2.hidden = false;

      let p3 = document.getElementById('candidate-three');
      p3.hidden = false;

  }



  const [positions, setPositions] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/position/open", {
      mode: "no-cors"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(positions);
        setPositions(data);
      })
      .catch((e) => {
        console.log("Failed to retrieve open positions");
        console.log(e);
      });
  }, []);

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
              {positions?.map((position, i) => (

              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                      <p key={position.id} value={i}>
                        {position.name}
                      </p>
                      <button onClick={showCandidates}>See Candidates</button>
                </div>
              </div>
              ))}
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
                  <p hidden="true" id="candidate-one">Shirley Watanabe</p>
                </div>
              </div>
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p hidden="true" id="candidate-two">Ralph Burlington</p>
                </div>
              </div>
              <div className="admin-add-role-preference-container">
                <div className="role-preference-elements">
                  <p hidden="true" id="candidate-three">Tiffany Comstock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
