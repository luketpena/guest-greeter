import React, {useState} from 'react';
import './App.css';

//-----< Data Imports >-----\\
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';

export default function App() {

  let [company, setCompany] = useState('');
  let [guest, setGuest] = useState('');

  //>> Constructor for Message
  function Message(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

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
  }

  function generateGreeting() {
    let newMessage = new Message('Luke','Peña');
    console.log(newMessage.findTime());
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
      
      <button onClick={generateGreeting}>Generate Greeting</button>
    </div>
  );
}