import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./routes/Landing";
import SignIn from "./routes/SignIn";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
