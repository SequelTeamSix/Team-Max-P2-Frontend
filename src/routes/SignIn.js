export default function SignIn() {
  return (
    <div className="modal">
      <h1 className="company-title">Maxtermind Inc</h1>
      <div className="sign-in-input-group">
        <label>Username</label>
        <input type="text"></input>
      </div>
      <div className="sign-in-input-group">
        <label>Password</label>
        <input type="text"></input>
      </div>
      <button
        className="button"
        onClick={() =>
          console.log(
            "add the logic to route to either the admin page or the user page"
          )
        }
      >
        Login
      </button>
      <p>Terms of use | Privacy Policy</p>
    </div>
  );
}
