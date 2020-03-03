import React from 'react';
import styled, {keyframes} from 'styled-components';

import Guests from '../../Data/Guests';
import Companies from '../../Data/Companies';

const animateIn = keyframes`
  0% {
    opacity: 0;
    left: -100px;
  }
  100% {
    opacity: 1;
    left: 0px;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0 16px 12px -8px rgba(0,20,30,.5);
  padding: 16px;
  border-radius: 16px;
  h3 {
    margin-bottom: 16px;
  }
  margin: 16px auto;
  animation-name: ${animateIn};
  animation-duration: 1s;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: .75em;
  color: gray;
`;

export default function MessageItem(props) {
  const {company} = Companies[props.message.companyId-1];
  const {firstName, lastName, reservation} = Guests[props.message.guestId-1];
  const {message} = props.message;

  const date = new Date();

  function makeReadableDate(date) {
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <Container>
      <Header>
        <p>From {company} to {firstName} {lastName} - Room {reservation.roomNumber} </p>
        <p>Sent on {makeReadableDate(date)}</p>
      </Header>
      <h3>Message:</h3>
      <p>"{message}"</p>
    </Container>
  )
}