import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./index.css"
import { useState, useEffect } from "react";

export default function Griddy(){
    const [results,setResults] = useState([0,0,0,0,0,0,0,0,0]);
    const [numbers,setNumbers] = useState([1,2,3,4,5,6,7,8,9]);

    const [status, setStatus] = useState(false);

    useEffect(() => {
        setTimeout(() => {   
            if (status) {
            const random = [...numbers];
            const index = random.findIndex(num => num === 0);

                if (index !== -1) {
                    const changedResults = [...results];
                    changedResults[index]++;
                    setResults(changedResults);
                }
            
                for (let i = 0; i < 9; i++) {
                    random[i] = Math.floor(Math.random() * 9);
                }

            setNumbers(random);
            }
        }, 300);
      }, [numbers, results, status]);
    

    function toggleFunc() {     
        return function() {    
            setStatus(!status);
        }
    }
    const toggle = toggleFunc();
    
    return (
        <>
        <Grid container spacing={0} sx={{maxWidth: 250, margin: '0 auto'}}>
            <Grid item xs={0}><div className="displayCell"><p>1</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>2</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>3</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>4</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>5</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>6</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>7</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>8</p></div></Grid>
            <Grid item xs={0}><div className="displayCell"><p>9</p></div></Grid>
        </Grid>

        <Grid container spacing={0} sx={{maxWidth: 225, margin: '0 auto'}}>
            {results.map((number, id) => (
                <Grid item xs={0} key={id} className={'displayCell'}><p>{number}</p></Grid>))}    

        </Grid>
        
        <Grid container sx={{maxWidth: 500, margin: '0 auto'}}>          
            {numbers.map((number, id) => (
                <Grid item xs={4} key={id} className={'cell'}>{number}</Grid>))}           
        </Grid>
        
        <Grid container sx={{maxWidth: 150, margin: '0 auto'}}>
            <Grid item xs={0}><Button variant='contained' onClick={toggle}>Start/Stop Roll</Button></Grid>
        </Grid>
        </>
    )
}
