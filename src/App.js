import React, { useState } from 'react';
import './App.css';
import ReverseProgressBar from './ReverseProgressBar';

function App() {
  const [initialTime, setInitialTime] = useState(0);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 200) + 1;
    setInitialTime(randomNumber);
  };

  return (
    <div className="App">
      <h1>Reverse Progress Bar</h1>
      <button onClick={generateRandomNumber}>Generate Random Number</button>
      <ReverseProgressBar initialTime={initialTime} />
    </div>
  );
}

export default App;
