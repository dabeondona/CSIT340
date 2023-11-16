import './index.css';
import { Box, Button, Grid, LinearProgress} from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function QueueExample() {
  const [progress, setProgress] = useState(0);
  const [array, setArray] = useState([[],[]]);


  const [highval, setHighVal] = useState([]);

  useEffect(() => {
    let hightimer;
    if (highval.length === 0) {
      clearInterval(hightimer);
      return;
    }

    const currentValue = highval;
    const sum = currentValue.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    })
    
    hightimer = setInterval(() => { 
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, sum);

    if (progress >= 100) {
        setHighVal((prevArray) => prevArray.slice(1)); 
        setProgress(0); 
    }

    return () => clearInterval(hightimer);
  }, [highval, progress]);

  const HighValue = (props) => {
    return <div className='highValue'> {props.id} </div>
  };

  function setNumber() {
      var tmp = [...array];
      tmp[0].push(Math.floor(Math.random() * 100) + 1);
      tmp[1].push("High");
      setArray(tmp);
  }

  function admitNumber() {
    let tmp = [...array];
    const val = tmp[0];
    tmp[0].shift();
    tmp[1].shift();

    let tmp2 = [...highval];
    tmp2.push(val);
    setHighVal(tmp2);

    setArray(tmp);
  }

  const RegularValue = (props) => {
    return <div className='regularValue'> {props.id} </div>
  };



  return (
      <>
      <Button onClick={setNumber}>Add item</Button>
      <Grid container spacing={0} sx={{maxWidth: 1000, margin: '0 auto'}}>
      {array[0].map((num, index) => {
        const string = array[1][index];
        return (
          string === "High" ?
          <HighValue id={num} />
            :
          <RegularValue id={num} />
        );
      })}
      </Grid>
      <hr></hr>
      {highval.map((number) => (
        <Grid xs={0}><HighValue id={number}/></Grid>
      ))}
      <Button onClick={admitNumber}>Admit Item</Button>
      <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
      </Box>
    </>
  );
}
