import st from "./assets/logo.png";
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Directory from "./components/Directory";
import Home from "./components/Home";
import Mentorship from "./components/Mentorship";
import Prof from "./components/Prof";

function App() {
  return (
    <Router> 
      <div className="App">
        <div className="separator">
          <h1 className="title">Alumni Network</h1>
          <div className="content">
            <img className="stevens-logo" src={st} alt="Stevens" />
          </div>
        </div>

        <div> 
          <nav className="navbar">
            <NavLink to="/" className="nav-item">Home</NavLink>
            <NavLink to="/mentorship" className="nav-item">Mentorship</NavLink>
            <NavLink to="/database" className="nav-item">Directory</NavLink>
            <NavLink to="/profile" className="nav-item">Profile</NavLink>
          </nav>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/database" element={<Directory />} />
            <Route path="/profile" element={<Prof />} />
          </Routes>
        </div>
      </div>
    </Router>  
  );
}

export default App;
