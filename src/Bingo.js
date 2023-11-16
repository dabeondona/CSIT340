import axios from 'axios';
import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import './Bingo.css';

export default function Bingo() {
  const [personalcard, setPersonalCard] = useState(null);
  const [gamecode, setGameCode] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  function enterGame() {
    if (gamecode == "") {
      return;
    }  
      axios.get(`http://www.hyeumine.com/getcard.php?bcode=${gamecode}`)
        .then(response => {
            if (!(response.status===200 && response.statusText=="OK")) {
                throw new Error('There is a problem with the request');
              }

            if(response.data) {
              setPersonalCard(response.data);
              setShowDashboard(true);
            } else {
              alert("Invalid Code, Try Again");
            }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
    
  function inputValue(e) {
    setGameCode(e.target.value);
  }

 

  return (
    <div className='Card'>
      <h2>Enter Your Code Here:</h2>
      <TextField id="standard-basic" variant="standard" label="Enter Code" value={gamecode} onChange={inputValue}></TextField>
      <Button variant="contained" onClick={enterGame}>Submit</Button>
      {showDashboard ? <GameCard value={personalcard} code={gamecode}/> : <></>}
    </div>
  );

  function GameCard({value, code}) {
    console.log(value);
    console.log(value.card.B);
    console.log(value.card.I);
    console.log(value.card.N);
    console.log(value.card.G);
    console.log(value.card.O);

    const value_token = value.playcard_token
  
    function checkWin() {
      console.log(value_token);
      axios.get(`http://www.hyeumine.com/checkwin.php?playcard_token=${value_token}`)
          .then(response => {
              if (!(response.status===200 && response.statusText=="OK")) {
                  throw new Error('There is a problem with the request');
                }
                response.data ? alert("Winner!") : alert("Try Again.");
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }
  
    return (
      <div className="Gamecard">
        <hr></hr>
        <h3 className='Gamecode'>{"Game Code: " + code}</h3>
        <Button variant="contained" color="success" onClick={checkWin}>Check Win</Button>
        <hr></hr>
        <h2 className='Bingo'>B</h2>
        {value.card.B.map((number) => (
          <span className="SpanStyle" key={Math.random()}><ToggleButton number={number}/></span>
        ))}
        <h2 className='Bingo'>I</h2>
        {value.card.I.map((number) => (
          <span className="SpanStyle" key={Math.random()}><ToggleButton number={number}/></span>
        ))}
        <h2 className='Bingo'>N</h2>
        {value.card.N.map((number) => (
          <span className="SpanStyle" key={Math.random()}><ToggleButton number={number}/></span>
        ))}
        <h2 className='Bingo'>G</h2>
        {value.card.G.map((number) => (
          <span className="SpanStyle" key={Math.random()}><ToggleButton number={number}/></span>
        ))}
        <h2 className='Bingo'>O</h2>
        {value.card.O.map((number) => (
          <span className="SpanStyle" key={Math.random()}><ToggleButton number={number}/></span>
        ))}
      </div>
    );
  }

  function ToggleButton({ number }) {
    const [toggle, setToggle] = useState('contained');
  
    const handleClick = () => {
      setToggle(toggle === 'contained' ? 'outlined' : 'contained');
    };
  
    return (
      <Button variant={toggle} onClick={handleClick}>{number}</Button>
    );
  }
}


