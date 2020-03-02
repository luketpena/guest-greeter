import React from 'react';
import './App.css';
import Companies from '../../Data/Companies';
import Guests from '../../Data/Guests';

function App() {
  return (
    <div className="App">
      <h1>Guest Greeter</h1>
      {JSON.stringify(Companies)}
      {JSON.stringify(Guests)}
    </div>
  );
}

export default App;
