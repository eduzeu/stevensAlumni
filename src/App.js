import st from "./assets/logo.png";
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Directory from "./components/Directory";
import Home from "./components/Home";
import Mentorship from "./components/Mentorship"
import Prof from "./components/Prof";
import Messages from "./components/Messages";
import Login from "./components/Login";

function App() {

  console.log("hello")


  return (
    <Router> 
      <div className="App">
        <div className="separator">
          <h3 className="title">Alumni Network</h3>
          <div className="content">
            <img className="stevens-logo" src={st} alt="Stevens" />
          </div>
        </div>

        <div>
        <div className="appbar">
          <nav className="navbar"> 
            <NavLink to="/" className="nav-item">Home</NavLink>
            <NavLink to="/mentorship" className="nav-item">Mentorship</NavLink>
            <NavLink to="/database" className="nav-item">Directory</NavLink>
            <NavLink to="/profile" className="nav-item">Profile</NavLink>
            <NavLink to="/messages" className="nav-item">Messages</NavLink>
            <NavLink to="/login" className="nav-item">Login</NavLink>
          </nav>
          </div>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/database" element={<Directory />} />
            <Route path="/profile" element={<Prof />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>  
  );
}

export default App;
