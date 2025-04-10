import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { MentBox } from "./components";

function Mentorship() {

  const [activeSection, setActiveSection] = useState(null);

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // const handleFindMentorsClick = () => {
  //   setActiveSection(activeSection === "find" ? null : "find");
  // };
  const handleFindMentorsClick = async () => {
    const newActive = activeSection === "find" ? null : "find";
    setActiveSection(newActive);
  
    if (newActive === "find") {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/getAllMentors");
        const data = await response.json();
        setMentors(data.users);
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

      {/* {activeSection === "find" && (
        <MentBox>Mentor Information</MentBox>
      )} */}
      {activeSection === "find" && (
        <MentBox>
          {loading ? (
            <p>Loading mentors...</p>
          ) : error ? (
            <p>{error}</p>
          ) : mentors.length > 0 ? (
            mentors.map((mentor, index) => (
              <div key={index} style={{ 
                border: "1px solid #ddd", 
                borderRadius: "10px", 
                padding: "15px", 
                marginBottom: "15px", 
                width: "100%", 
                maxWidth: "500px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fafafa"
              }}>
                <h3 style={{ marginBottom: "5px" }}>{mentor["Full Name"]}</h3>
                <p><strong>Job:</strong> {mentor["Job Title"]} at {mentor["Company"]}</p>
                <p><strong>Graduation Year:</strong> {mentor["Graduation Year"]}</p>
                <p><strong>Major:</strong> {mentor["Major"]}</p>
                <p><strong>Location:</strong> {mentor["Location"]}</p>
                <p><strong>Email:</strong> <a href={`mailto:${mentor.Email}`}>{mentor.Email}</a></p>
                <p><strong>LinkedIn:</strong> <a href={`https://${mentor["LinkedIn Profile"]}`} target="_blank" rel="noopener noreferrer">{mentor["LinkedIn Profile"]}</a></p>
              </div>
            ))
            
          ) : (
            <p>No mentors found.</p>
          )}
        </MentBox>
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


