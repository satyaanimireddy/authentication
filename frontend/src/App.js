import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Nav from "./components/Nav";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard";

function App() {
  let location = useLocation();
  return (
    <div>
      {location.pathname === "/" && <Nav />}
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
