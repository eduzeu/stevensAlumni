import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LogOut() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    alert("You have successfully logged out :)");
    navigate("/");
  };

  return (
    <LogOutContainer>
      <h2>Are you sure you want to log out?</h2>
      <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
    </LogOutContainer>
  );
}

export default LogOut;

// Styled Components
const LogOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const LogOutButton = styled.button`
  padding: 12px 24px;
  background-color: #002244;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #003366;
  }
`;
