import React from "react";
import styled from "styled-components";
import "../App.css";

function Mentorship() {
  return (
    <CenterWrapper>

      <MentBox>
        {/* Mentoring */}
        <MentButton>Find a Mentor</MentButton>
        <MentButton>Current Mentor</MentButton>
        <MentButton>Pending Mentors</MentButton>


      </MentBox>
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

`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MentBox = styled.div`
  border-radius: 10px;
  background-color: white;
  color: #a4243c;
  font-size: 18px;
  width: 80%;
  padding: 20px;
  margin-top: 20px;
  border: none;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center; 
  display: flex; 
  justify-content: center;  
  gap: 15px;  
`;

export default Mentorship;
