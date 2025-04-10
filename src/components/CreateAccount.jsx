import react from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import '../App.css';

import { MessageBox } from "./Messages";
import { Center } from "./Messages";
import { Form, Label, Input, Title } from "./Login";
import { CreateAccountButton } from "./Login";



function CreateAccount() {

  const handleSubmitButton = () => {

  }

  return (
    <Center>
      <MessageBox>
        <Form>
          <Title>Sign In</Title>
          <Label>Full Name</Label>
          <Input type="text" name="username" placeholder="Enter your full name" />
          <Label>Graduation</Label>
          <Input type="text" name="grad" placeholder="Enter your Graduation year" />
          <Label>Email</Label>
          <Input type="text" name="email" placeholder="Enter your email" />
          <Label>Job Title</Label>
          <Input type="text" name="title" placeholder="If you are a student, leave blank" />
          <Label>Company</Label>
          <Input type="text" name="company" placeholder="If you are a student, leave blank" />
          <Label>Linkedin Profile</Label>
          <Input type="text" name="linkedin" placeholder="Enter your LinkedIn URL" />
          <Label>Location </Label>
          <Input type="text" name="location" placeholder="Enter your City and State" />
          <Label>Mentoring </Label>
          <Input type="text" name="location" placeholder="Enter yes if you are willing to mentor, No otherwise" />
          <SubmitButton onClick={handleSubmitButton}> Submit </SubmitButton>
        </Form>

      </MessageBox>
    </Center>
  );


}

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

    &:hover{ 
  text-decoration: underline;
  }

`

export default CreateAccount