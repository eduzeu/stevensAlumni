import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../App.css";

function Directory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getAllUsers");
        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Unexpected data format:", data);
          setUsers([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return (
    <DirectoryContainer>
      {loading ? (
        <LoadingText>Loading users...</LoadingText>
      ) : (
        <UserList>
          {users.map((user, index) => (
            <UserCard key={index}>
              <p><strong>Name:</strong> {user["Full Name"]}</p>
              <p><strong>Company:</strong> {user["Company"]}</p>
              <p><strong>Job Title:</strong> {user["Job Title"]}</p>
              <p><strong>Major:</strong> {user["Major"]}</p>
              <p><strong>Graduation Year:</strong> {user["Graduation Year"]}</p>
              <p><strong>Location:</strong> {user["Location"]}</p>
              <p><strong>LinkedIn:</strong> <a href={`https://${user["LinkedIn Profile"]}`} target="_blank" rel="noopener noreferrer">{user["LinkedIn Profile"]}</a></p>
            </UserCard>
          ))}
        </UserList>
      )}
    </DirectoryContainer>
  );
}

export default Directory;

// Styled Components
const DirectoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const LoadingText = styled.p`
  font-size: 20px;
  color: #555;
  margin-top: 20px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const UserCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #a4243c;
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  font-size: 14px;
`;

