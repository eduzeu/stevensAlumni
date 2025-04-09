import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { MentBox } from "./components";

function Mentorship() {

  const [activeSection, setActiveSection] = useState(null);

  const handleFindMentorsClick = () => {
    setActiveSection(activeSection === "find" ? null : "find");
  };

  const handleCurrentMentorClick = () => {
    setActiveSection(activeSection === "current" ? null : "current");
  };

  const handlePendingMentorClick = () => {
    setActiveSection(activeSection === "pending" ? null : "pending");
  };

  return (
    <CenterWrapper>

      <MentBox>
        <MentButton onClick={handleFindMentorsClick}>Find a Mentor</MentButton>
        <MentButton onClick={handleCurrentMentorClick}>Current Mentor</MentButton>
        <MentButton onClick={handlePendingMentorClick}>Pending Mentors</MentButton>
      </MentBox>

      {activeSection === "find" && (
        <MentBox>Mentor Information</MentBox>
      )}

      {activeSection === "current" && (
        <MentBox>Current Mentor info</MentBox>
      )}

      {activeSection === "pending" && (
        <MentBox>Your pending mentor</MentBox>
      )}

    </CenterWrapper>
  );
}

const MentButton = styled.button`
  display: inline-block; /* Ensures buttons are next to each other */
  border: none;
  color: #a4243c;
  background-color: white;
  margin-top: 15px; /* Adds some space between the top of the box and buttons */
  margin-right: 15px; /* Adds space between the buttons */
  padding: 10px 20px;
  width: auto; 
  
  &:hover{ 
  text-decoration: underline;
  }

`;

const CenterWrapper = styled.div`
  display: flex;
flex-direction: column;
  align-items: center;
`;

export default Mentorship;


