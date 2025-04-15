import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "../App.css";

function Prof() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.sessionToken;
      console.log(token);
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json(); 
        setUserData(data.profile);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchProfile();
  }, []);

  console.log(userData)

  return (
    <MentBox>
      <h3>{userData ? userData["Full Name"] : "Name"}</h3>
      <p>Job: {userData ? userData["Job Title"] : "N/A"}</p>
      <p>Major: {userData ? userData["Major"] : "N/A"}</p>
      <p>Year: {userData ? userData["Graduation Year"] : "N/A"}</p>
    </MentBox>
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
