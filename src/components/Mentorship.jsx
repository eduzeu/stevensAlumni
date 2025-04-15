import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { MentBox } from "./components";

function Mentorship() {
  console.log(sessionStorage.sessionToken);
  const token = sessionStorage.sessionToken;

  const [activeSection, setActiveSection] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingMentor, setPendingMentors] = useState([]);

  const handleFindMentorsClick = async () => {
    const newActive = activeSection === "find" ? null : "find";
    setActiveSection(newActive);

    if (newActive === "find") {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/getAllMentors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setMentors(data.users || []);
      } catch (err) {
        setError("Failed to load mentors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCurrentMentorClick = () => {
    setActiveSection(activeSection === "current" ? null : "current");
  };

  const handlePendingMentorClick = (mentor) => {
    setActiveSection("pending");
    if (mentor) {
      setPendingMentors((prev) => [...prev, mentor]);
    }
  };

  return (
    <CenterWrapper>
      <MentBox>
        <MentButton onClick={handleFindMentorsClick}>Find a Mentor</MentButton>
        <MentButton onClick={handleCurrentMentorClick}>Current Mentor</MentButton>
        <MentButton onClick={() => setActiveSection(activeSection === "pending" ? null : "pending")}>
          Pending Mentors
        </MentButton>
      </MentBox>

      {activeSection === "find" && (
        <div>
          {loading ? (
            <p>Loading mentors...</p>
          ) : error ? (
            <p>{error}</p>
          ) : mentors.length > 0 ? (
            mentors.map((mentor, index) => (
              <MentorCard key={index}>
                <h3>{mentor["Full Name"]}</h3>
                <p><strong>Job:</strong> {mentor["Job Title"]} at {mentor["Company"]}</p>
                <p><strong>Graduation Year:</strong> {mentor["Graduation Year"]}</p>
                <p><strong>Major:</strong> {mentor["Major"]}</p>
                <p><strong>Location:</strong> {mentor["Location"]}</p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a href={`https://${mentor["LinkedIn Profile"]}`} target="_blank" rel="noopener noreferrer">
                    {mentor["LinkedIn Profile"]}
                  </a>
                </p>
                <RequestButton onClick={() => handlePendingMentorClick(mentor)}>
                  Send Request
                </RequestButton>
              </MentorCard>
            ))
          ) : (
            <p>No mentors found.</p>
          )}
        </div>
      )}

      {activeSection === "current" && (
        <MentBox>Current Mentor info</MentBox>
      )}

      {activeSection === "pending" && pendingMentor.length > 0 && (
        <div style={{ width: "90%", marginTop: "20px" }}>
          {pendingMentor.map((mentor, index) => (
            <MentorCard key={index}>
              <h3>{mentor["Full Name"]}</h3>
              <p><strong>Job:</strong> {mentor["Job Title"]} at {mentor["Company"]}</p>
              <p><strong>Graduation Year:</strong> {mentor["Graduation Year"]}</p>
              <p><strong>Major:</strong> {mentor["Major"]}</p>
              <p><strong>Location:</strong> {mentor["Location"]}</p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={`https://${mentor["LinkedIn Profile"]}`} target="_blank" rel="noopener noreferrer">
                  {mentor["LinkedIn Profile"]}
                </a>
              </p>
            </MentorCard>
          ))}
        </div>
      )}
    </CenterWrapper>
  );
}

const MentButton = styled.button`
  display: inline-block;
  border: none;
  color: #a4243c;
  background-color: white;
  margin-top: 15px;
  margin-right: 15px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RequestButton = styled.button`
  margin-top: 10px;
  background-color: #a4243c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const MentorCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 90%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
  margin: 15px auto 20px auto;
`;

export default Mentorship;
