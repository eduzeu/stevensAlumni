import React from "react";
import styled from "styled-components";
import "../App.css";

function Messages() {
  return (
    <Center>
      <MessageBox>
        <MessageText>Message Request</MessageText>
        <ButtonGroup>
          <RequestButton>Confirm</RequestButton>
          <RequestButton>Delete</RequestButton>
        </ButtonGroup>
      </MessageBox>
    </Center>
  );
}

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
`;

export const MessageBox = styled.div`
  border-radius: 10px;
  background-color: white;
  color: #a4243c;
  font-size: 18px;
  width: 80%;
  padding: 20px;
  margin-top: 20px;
  border: none;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageText = styled.div`
  flex: 1;
  text-align: left;
`;

const RequestButton = styled.button`
  border-radius: 15px;
  background-color: rgb(92, 91, 91);
  color: #fff;
  font-size: 14px;
  padding: 8px 12px;
  cursor: pointer;
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;


export default Messages;
