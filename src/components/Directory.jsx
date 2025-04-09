import react from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import "../App.css"

function Directory() {

  return (
    <DirecButton> Click me </DirecButton>
  )

}

export default Directory;

const DirecButton = styled.button`
  border-radius: 10px;
  background-color: white; 
  color: #a4243c;
  font-size: 18px;
  width: 80%;
  height: 80px;
  margin-top: 20px;
  border: none;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

  &:hover {
  background-color: #708090;
   box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.3); 
  }

  
`