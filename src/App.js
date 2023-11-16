import React, { useEffect, useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [validatedValues, setValidatedValues] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const [matchingColors, setMatchingColors] = useState({}); 
  const colors = [
    'red', 'blue', 'green', 'purple', 'orange',
    'cyan', 'magenta', 'lime', 'pink', 'teal', 
    'lavender', 'brown', 'beige', 'maroon', 'mint', 
    'olive', 'coral', 'navy', 'grey', 'yellow', 
    'turquoise', 'tan', 'skyblue', 'salmon', 'gold', 
    'orchid', 'violet', 'indigo', 'sienna', 'chartreuse'
  ];
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const changeValue = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  function handleEnter() {
    if (inputValue === '') {
      return;
    }
    const pattern = /^\d{2}[A-Za-z]$/;
    const values = inputValue.split(',').map((value) => value.trim());
    const validated = values.filter((value) => pattern.test(value));
    if (validated.length > 0) {
      setValidatedValues((prevValues) => [...prevValues, ...validated]);
    }
    setInputValue(''); 
  }

  function showOutput() {
    if (jsonData === null) {
      return;
    }
  
    const output = [];
    const newMatchingColors = {};
    const usedColors = [];
    const pairings = {};

    const filteredData = validatedValues.reduce((acc, code) => {
      if (jsonData[code]) {
        acc[code] = jsonData[code];
      }
      return acc;
    }, {});  
  
    Object.values(filteredData).flat().forEach(radioCode => {
      pairings[radioCode] = (pairings[radioCode] || 0) + 1;
    });
  
    Object.keys(pairings).forEach(radioCode => {
      if (pairings[radioCode] > 1) { 
        let assignedColor;
        for (let color of colors) {
          if (!usedColors.includes(color)) {
            assignedColor = color;
            usedColors.push(color);
            break;
          }
        }
        newMatchingColors[radioCode] = assignedColor;
      }
    });
  
    validatedValues.forEach((code) => {
      if (jsonData[code]) {
        const radioCodeData = jsonData[code].map(radioCode => {
          return {
            code: radioCode,
            color: pairings[radioCode] > 1 ? newMatchingColors[radioCode] : 'black' 
          };
        });
        output.push({ key: code, value: radioCodeData });
      }
    });
  
    setMatchingColors(newMatchingColors); 
    setOutputData(output);
  }
  
  return (
    <>
    <div>
      <input type="text" value={inputValue} onChange={changeValue} />
      <button onClick={handleEnter}>Submit</button>

      <h3>Validated Values:</h3>
      <ul>
        {validatedValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>

    <div>
      <hr/>
      <button onClick={showOutput}>Show Output</button>
      <h3>Output:</h3>
      <p>
      {outputData.map((entry, entryIndex) => (
        <span key={entryIndex}>
          {entry.key} ={'>'} {' '}
          {entry.value.map((radioCodeData, radioIndex) => (
            <React.Fragment key={radioIndex}>
              <span style={{ 
                color: radioCodeData.color, 
                fontWeight: radioCodeData.color !== 'black' ? 'bold' : 'normal' 
              }}>
                {radioCodeData.code}
              </span>
              {radioIndex !== entry.value.length - 1 && ' <-> '}
            </React.Fragment>
          ))}
          {entryIndex !== outputData.length - 1 && ', '}
        </span>
      ))}
    </p>
    </div>
    </>
  );
}

