import React, {useState} from 'react';
import './App.css';

//-----< Data Imports >-----\\
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';

export default function App() {

  let [company, setCompany] = useState('');
  let [guest, setGuest] = useState('');

  //>> Constructor for Message
  function Message(myGuest, myCompany) {
    this.firstName = myGuest.firstName;
    this.lastName = myGuest.lastName;

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
      
      return `${this.findTime()} ${this.firstName} ${this.lastName}, and welcome to ${myCompany.company}! Room ${myGuest.reservation.roomNumber} is ready for you.`;
    }
  }

  function sendGreeting(myGuest, myCompany) {
    let newMessage = new Message(myGuest, myCompany);
    console.log(newMessage.generateGreeting());
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

  return (
    <div className="App">
      <h1>Guest Greeter</h1>

      <select value={company} onChange={event=>setCompany(event.target.value)}>
        <option disabled value="">Choose a Company</option>
        {renderCompanyOptions()}
      </select>

      <select value={guest} onChange={event=>setGuest(event.target.value)}>
        <option disabled value="">Select a Guest</option>
        {renderGuestOptions()}
      </select>

      <input></input>
      
      <button onClick={()=>sendGreeting(Guests[guest],Companies[company])}>Generate Greeting</button>
    </div>
  );
}