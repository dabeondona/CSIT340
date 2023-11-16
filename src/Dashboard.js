import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [test, setTest] = useState(null);

    const enterGame = (e) => {
        axios.get(`http://www.hyeumine.com/getcard.php?bcode=HEelhJos`)
          .then(response => {
              if (!(response.status===200 && response.statusText=="OK")) {
                  throw new Error('There is a problem with the request');
                }
                setTest(response.data);
                console.log(test)
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }

      return (
        <div>
          <button onClick={enterGame}>TTTT</button>
        </div>
      );     
}