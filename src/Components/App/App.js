import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './App.css';

//-----< Data Imports >-----\\
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';
import Templates from '../../Data/Templates';

//-----< Component Imports >-----\\
import MessageItem from '../MessageItem/MessageItem';

//-----< Styling >-----\\
const Container = styled.div`
  min-height: 100vh;
  padding: 64px;

  h1,h2 {
    color: white;
    text-align: center;
    margin-bottom: 32px;
  }

  form {
    margin: 0 auto;
    textarea, button, .input-box {
      display: block;
      margin: 8px auto;
      width: max-content;
    }
    select {
      margin: 0 8px;
    }
    textarea {
      resize: none;
      width: 500px;
      height: 250px;
      padding: 8px;
      outline: none;
      border: none;
      border-radius: 8px;
    }
    button {
      padding: 8px 32px;
      background: none;
      border-radius: 32px;
      border: 1px solid white;
      color: white;
      cursor: pointer;
      transition: all .2s;
    }
    button:hover {
      padding: 8px 48px;
      background-color: white;
      color: steelblue;
    }
  }
`;

const MessageBox = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

let dummyData = [
  {
    guestId: 1,
    companyId: 1,
    message: 'Hello, world! This is some dummy data to have something populated when you start. If you want to start fresh, simply change the messageList to an empty array instead of dummyData'
  }
]

export default function App() {

  //-----< Set Up >-----\\
  let [company, setCompany] = useState('');
  let [guest, setGuest] = useState('');
  let [templateIndex,setTemplateIndex] = useState('');
  let [message, setMessage] = useState('');
  let [messageList, setMessageList] = useState(dummyData);

  //>> This updates the message in the textarea live as options are selected
  useEffect(()=>{
    generateMessage()
  },[company, guest, templateIndex]);

  

  //>> Only returns a greeting based on the time of day
  function findTime() {
    let time = new Date().getHours();
    if (time<12) {
      return 'Good morning';
    } else if (time<16) {
      return 'Good afternoon';
    } else if (time<19) {
      return 'Good evening';
    } else {
      return 'Good night'
    }
  }


  //------< Rendering Option Lists >-----\\
  function renderCompanyOptions() {
    return Companies.map( (item,i)=> {
      return <option key={i} value={i}>{item.company}</option>
    });
  }

  function renderGuestOptions() {
    return Guests.map( (item,i)=>{
      return <option key={i} value={i}>{item.firstName} {item.lastName}</option>
    });
  }

  function renderTemplateOptions() {
    return Templates.map( (item,i)=>{
      return <option key={i} value={i}>{item.name}</option>
    })
  }

  //-----< Methods >-----\\

  //>> Constructor for Message objects, stored in state[] and rendered to DOM
  function Greeting(myGuest, myCompany, myMessage) {
    this.guestId = myGuest.id;
    this.companyId = myCompany.id;
    this.message = myMessage;
  }

  function makeReadableDate(date) {
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
  }

  //>> Generates the message only if a template has been selected
  function generateMessage() {
    if (templateIndex && Templates[templateIndex]) {
      //>> Copy and modify the template
      let myMessage = Templates[templateIndex].text.replace('{{timeGreeting}}',findTime());
      //>> Update guest information if a guest has been selected
      if (Guests[guest]) {

        let startDate = new Date(Guests[guest].reservation.startTimestamp * 1000);
        let endDate = new Date(Guests[guest].reservation.endTimestamp * 1000);
        
        /*
          I know this isn't exactly how templating works in JS, so I would
          research a more "correct" way to do this in the future.
        */
        myMessage = myMessage
          .replace('{{firstName}}', Guests[guest].firstName)
          .replace('{{lastName}}', Guests[guest].lastName)
          .replace('{{roomNumber}}', Guests[guest].reservation.roomNumber)
          .replace('{{startTimestamp}}', makeReadableDate(startDate))
          .replace('{{endTimestamp}}', makeReadableDate(endDate));
      }
      //>> Update company information if a company has been selected
      if (Companies[company]) {
        myMessage = myMessage.replace('{{company}}', Companies[company].company);
      }  
      setMessage(myMessage);
    }
  }


  function submitGreeting(event) {
    event.preventDefault();
    
    //>> Generate and store the greeting
    const newGreeting = new Greeting(Guests[guest], Companies[company], message);
    let messageListCopy = [...messageList];
    messageListCopy.push(newGreeting);
    setMessageList(messageListCopy);

    //>> Clear the inputs
    setGuest('');
    setCompany('');
    setTemplateIndex('');
    setMessage('');
  }

  function renderMessages() {
    return messageList.map( (item,i)=>{
      return <MessageItem key={i} message={item}/>
    })
  }


  return (
    <Container>
      <h1>Guest Greeter</h1>
      
      
      <form onSubmit={event=>submitGreeting(event,templateIndex)}>

        <div className="input-box">
          <select required value={company} onChange={event=>setCompany(event.target.value)}>
            <option disabled value="">Choose a Company</option>
            {renderCompanyOptions()}
          </select>

          <select required value={guest} onChange={event=>setGuest(event.target.value)}>
            <option disabled value="">Select a Guest</option>
            {renderGuestOptions()}
          </select>

          <select value={templateIndex} onChange={event=>setTemplateIndex(event.target.value)}>
            <option disabled value="">Select a Template</option>
            {renderTemplateOptions()}
          </select>
        </div>

        <textarea required value={message} onChange={event=>setMessage(event.target.value)}/>       
        <button>Send Greeting</button>
      </form>

      <h2>Message Board</h2>
      <MessageBox>
        {renderMessages()}
      </MessageBox>
      
    </Container>
  );
}