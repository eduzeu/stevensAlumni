import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Import axios
import { MessageBox } from "./Messages";
import { Center } from "./Messages";
import { Form, Label, Input, Title } from "./Login";

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    graduationYear: "",
    email: "",
    jobTitle: "",
    company: "",
    linkedin: "",
    location: "",
    mentoring: "",
    major: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitButton = async () => {
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/createAccount", formData);
      console.log(response.data.message); // Success message
      alert("Account created successfully!");
    } catch (error) {
      console.error("There was an error creating the account:", error.response.data);
      alert("Error creating account: " + error.response.data.message); // Display detailed error message
    }

  };

  return (
    <Center>
      <MessageBox>
        <Form>
          <Title>Create Account</Title>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Create your password"
            value={formData.password}
            onChange={handleChange}
          />
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <Label>Graduation</Label>
          <Input
            type="text"
            name="graduationYear"
            placeholder="Enter your graduation year"
            value={formData.graduationYear}
            onChange={handleChange}
          />
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <Label>Job Title</Label>
          <Input
            type="text"
            name="jobTitle"
            placeholder="If you are a student, leave blank"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <Label>Company</Label>
          <Input
            type="text"
            name="company"
            placeholder="If you are a student, leave blank"
            value={formData.company}
            onChange={handleChange}
          />
          <Label>Major</Label>
          <Input
            type="text"
            name="major"
            placeholder="Enter your major"
            value={formData.major}
            onChange={handleChange}
          />
          <Label>LinkedIn Profile</Label>
          <Input
            type="text"
            name="linkedin"
            placeholder="Enter your LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            placeholder="Enter your City and State"
            value={formData.location}
            onChange={handleChange}
          />
          <Label>Mentoring</Label>
          <Input
            type="text"
            name="mentoring"
            placeholder="Enter yes if you are willing to mentor, no otherwise"
            value={formData.mentoring}
            onChange={handleChange}
          />
          <SubmitButton onClick={handleSubmitButton}>Submit</SubmitButton>
        </Form>
      </MessageBox>
    </Center>
  );
}

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.div`
  margin-top: 10px;
  background-color: #a4243c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  padding: 8px 16px;
  cursor: pointer;
  align-self: center;
  width: fit-content;
  transition: background-color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

export default CreateAccount;
