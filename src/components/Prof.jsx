import React from "react";
import styled from "styled-components";
import "../App.css";

function Prof() {
  return (
    <>
      <MentBox>
        <h3>Name</h3>
        <p>Aspiring:</p>
        <p>Major:</p>
        <p>Year:</p>
      </MentBox>
    </>
  );
}

const MentBox = styled.div`
  border-radius: 10px;
  background-color: white;
  color: #a4243c;
  font-size: 18px;
  margin-top: 20px;
  border: none;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;

  display: flex;
  flex-direction: column;  
  align-items: center; 
  justify-content: center; 
  gap: 5px;
`;

export default Prof;
