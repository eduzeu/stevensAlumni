import react from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import '../App.css';
import st from "../assets/logo.png"


function NavBar() {
  return (
    <>
      <div className="separator">
        <h3 className="title">Alumni Network</h3>
        <div className="content">
          <img className="stevens-logo" src={st} alt="Stevens" />
        </div>
      </div>
      <div className="appbar">
        <nav className="navbar">
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/mentorship" className="nav-item">Mentorship</NavLink>
          <NavLink to="/database" className="nav-item">Directory</NavLink>
          <NavLink to="/profile" className="nav-item">Profile</NavLink>
          <NavLink to="/messages" className="nav-item">Mentor Request</NavLink>
          <NavLink to="/logout" className="nav-item">Log out</NavLink>

        </nav>
      </div>
    </>
  );

}
export default NavBar;

