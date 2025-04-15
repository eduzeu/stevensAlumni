import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios
import styled from "styled-components";
import "../App.css";

function Prof() {
  const [userData, setUserData] = useState(null);

  const handleProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/getUserById", {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
      });
      setUserData(response.data.user);  // Save the response data (user info) to the state
      console.log(response);
    } catch (e) {
      console.error("Error fetching user data", e);
    }
  };

  return (
    <>
      <MentBox>
        <h3>{userData ? userData["Full Name"] : "Name"}</h3>
        <p>Aspiring: {userData ? userData["Job Title"] : "N/A"}</p>
        <p>Major: {userData ? userData["Major"] : "N/A"}</p>
        <p>Year: {userData ? userData["Graduation Year"] : "N/A"}</p>
        <button onClick={handleProfile}>Fetch Profile</button>
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
