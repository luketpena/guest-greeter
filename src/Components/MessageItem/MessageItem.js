import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

export default function MessageItem(props) {
  const {company, firstName, lastName, roomNumber, message} = props.message;
  const date = new Date();

  return (
    <Container>
      <p>From {company} to {firstName} {lastName} - Room {roomNumber} </p>
      <p>Sent on {date.getFullYear()} at {date.getHours()}:{date.getMinutes()}</p>
      <h3>Message:</h3>
      <p>{message}</p>
    </Container>
  )
}