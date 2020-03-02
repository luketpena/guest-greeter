import React, {useState} from 'react';
import './App.css';

//-----< Data Imports >-----\\
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';

export default function App() {

  let [company, setCompany] = useState('');
  let [guest, setGuest] = useState('');
  let [message, setMessage] = useState('');

  //>> Constructor for Message
  function Greeting(myGuest, myCompany, myMessage) {
    this.firstName = myGuest.firstName;
    this.lastName = myGuest.lastName;
    this.message = myMessage;

    //Generates a greeting based on the time of day
    this.findTime = function() {
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

    this.generateGreeting = function() {     
      let text = `${this.findTime()} ${this.firstName} ${this.lastName}, and welcome to ${myCompany.company}! Room ${myGuest.reservation.roomNumber} is ready for you.`;
      if (myMessage!=='') {
        text += ` ${this.message}`;
      } else {
        text += ` Enjoy your stay!`;
      }
      return text;
    }
  }

  function sendGreeting(myGuest, myCompany, myMessage) {
    let newGreeting = new Greeting(myGuest, myCompany, myMessage);
    console.log(newGreeting.generateGreeting());
  }

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

  function submitGreeting(event) {
    event.preventDefault();
    sendGreeting(Guests[guest],Companies[company], message);
    setGuest('');
    setCompany('');
    setMessage('');
  }

  return (
    <div className="App">
      <h1>Guest Greeter</h1>

      <form onSubmit={submitGreeting}>
        <select required value={company} onChange={event=>setCompany(event.target.value)}>
          <option disabled value="">Choose a Company</option>
          {renderCompanyOptions()}
        </select>

        <select required value={guest} onChange={event=>setGuest(event.target.value)}>
          <option disabled value="">Select a Guest</option>
          {renderGuestOptions()}
        </select>

        <input value={message} onChange={event=>setMessage(event.target.value)} placeholder="Enjoy your stay!"/>
        
        <button>Generate Greeting</button>
      </form>
    </div>
  );
}