import React, {useState} from 'react';
import axios from 'axios';

export default function Test() {
    const [test, setTest] = useState([{}]);

    axios.get(`http://www.hyeumine.com/bingodashboard.php?bcode=HEelhJos`)
    .then(response => {
        if (!(response.status===200 && response.statusText=="OK")) {
          throw new Error('There is a problem with the request');
        }
        setTest(response.data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })

    return (
        <div>
            {console.log(test)}
        </div>
    );
}