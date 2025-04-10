import React, { useState } from "react";
import styled from "styled-components";
import { MessageBox } from "./Messages";
import { Center } from "./Messages";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    console.log("clicked!")
    navigate("/createaccount");
  }

  return (
    <Center>
      <MessageBox>
        <Form>
          <Title>Sign In</Title>
          <Label>Username</Label>
          <Input type="text" name="username" placeholder="Enter your username" />
          <Label>Password</Label>
          <Input type="password" name="password" placeholder="Enter your password" />
          <SignInButton>Sign In</SignInButton>
          <CreateAccountButton onClick={handleCreateAccount}> Create an account</CreateAccountButton>

        </Form>

      </MessageBox>
    </Center>
  );
}


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  margin: 8px 0 4px;
  text-align: left;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SignInButton = styled.button`
  margin-top: 20px;
  background-color: #a4243c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #861d30;
  }
`;


export const CreateAccountButton = styled.button`
  margin-top: 10px;
  background-color: white;
  color: #a4243c; 
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  align-self: center; /* aligns it to the left */
  width: fit-content;     /* button wraps around the text */
  transition: background-color 0.2s ease;

  &:hover{ 
  text-decoration: underline;
  }
`;

export default Login;
