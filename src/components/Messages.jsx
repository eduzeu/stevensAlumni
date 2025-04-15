import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../App.css";

function Messages() {
  const [requests, setRequests] = useState([]);
  const token = sessionStorage.sessionToken;

  useEffect(() => {
    displayRequests();
  }, []);

  const displayRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (e) {
      console.error(e.message);
    }
  };



  const handleConfirmMentee = async (id, mentee) => {
    try {
      const response = await fetch(`http://localhost:5000/api/acceptMentoree/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to accept mentee");
      }

      // Save to localStorage current mentors
      const stored = localStorage.getItem("currentMentors");
      const currentMentors = stored ? JSON.parse(stored) : [];
      const updated = [...currentMentors, mentee];
      localStorage.setItem("currentMentors", JSON.stringify(updated));

      // Remove from requests list
      setRequests((prev) => prev.filter((r) => r._id !== id));
      alert("succesfully accepted mentor!")
    } catch (err) {
      console.error(err);
    }
  };
  console.log(requests)
  return (
    <Center>
      {requests.length > 0 ? (
        requests.map((req, index) => (
          <MessageBox key={index}>
            <MessageText>
              <p><strong>Name:</strong> {req["Full Name"]}</p>
              <p><strong>Job:</strong> {req["Job Title"]} at {req["Company"]}</p>
              <p><strong>Major:</strong> {req["Major"]}</p>
              <p><strong>Graduation Year:</strong> {req["Graduation Year"]}</p>
              <p><strong>Location:</strong> {req["Location"]}</p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={`https://${req["LinkedIn Profile"]}`} target="_blank" rel="noopener noreferrer">
                  {req["LinkedIn Profile"]}
                </a>
              </p>
            </MessageText>
            <ButtonGroup>
              <RequestButton onClick={() => handleConfirmMentee(req._id, req)}>Confirm</RequestButton>
              <RequestButton>Delete</RequestButton>
            </ButtonGroup>
          </MessageBox>
        ))
      ) : (
        <p>No incoming mentor requests.</p>
      )}
    </Center>
  );
}

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const MessageBox = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin: 10px;
  width: 600px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const MessageText = styled.div`
  margin-bottom: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center; /* Centers the buttons horizontally */
  gap: 10px;
  margin-top: 10px;
`;

export const RequestButton = styled.button`
  background-color: #a4243c;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Messages;
