import React, {useState} from 'react';
import './App.css';

//-----< Data Imports >-----\\
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';
import Templates from '../../Data/Templates';

export default function App() {

  let [company, setCompany] = useState('');
  let [guest, setGuest] = useState('');
  let [message, setMessage] = useState('');
  let [templateIndex,setTemplateIndex] = useState(0);

  //>> Constructor for Message
  function Greeting(myGuest, myCompany, myMessage) {
    this.customerId = myGuest.id;
    this.firstName = myGuest.firstName;
    this.lastName = myGuest.lastName;

    this.companyId = myCompany.id;
    this.company = myCompany.company;
    
    this.message = myMessage;
  }

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

  function generateMessage() {
    //>> Copy and modify the template
    let myMessage = Templates[templateIndex].text
      .replace('{{firstName}}', Guests[guest].firstName)
      .replace('{{lastName}}', Guests[guest].lastName)
      .replace('{{company}}', Companies[company].company)
      .replace('{{roomNumber}}', Guests[guest].reservation.roomNumber)
      .replace('{{startTimestamp}}', Guests[guest].reservation.startTimestamp)
      .replace('{{endTimestamp}}', Guests[guest].reservation.endTimestamp)
      .replace('{{timeGreeting}}',findTime());
    return myMessage;
  }

  function submitGreeting(event,templateIndex) {
    event.preventDefault();
    
    
    
    const newGreeting = new Greeting(Guests[guest], Companies[company], myMessage);
    console.log(newGreeting);

    //>> Clear the inputs
    setGuest('');
    setCompany('');
    setMessage('');
  }

  return (
    <div className="App">
      <h1>Guest Greeter</h1>
      
      <form onSubmit={event=>submitGreeting(event,templateIndex)}>
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