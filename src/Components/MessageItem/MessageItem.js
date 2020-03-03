import React from 'react';
import styled from 'styled-components';

import Guests from '../../Data/Guests';
import Companies from '../../Data/Companies';

const Container = styled.div`
  background-color: white;
  box-shadow: 0 16px 12px -8px rgba(0,20,30,.5);
  padding: 16px;
  border-radius: 16px;
  h3 {
    margin-bottom: 16px;
  }
  margin: 16px auto;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: .75em;
  color: gray;
`;

export default function MessageItem(props) {
  const {company} = Companies[props.message.companyId];
  const {firstName, lastName, reservation} = Guests[props.message.guestId];
  const {message} = props.message;

  const date = new Date();

  return (
    <Container>
      <Header>
        <p>From {company} to {firstName} {lastName} - Room {reservation.roomNumber} </p>
        <p>Sent on {date.getFullYear()} at {date.getHours()}:{date.getMinutes()}</p>
      </Header>
      <h3>Message:</h3>
      <p>"{message}"</p>
    </Container>
  )
}