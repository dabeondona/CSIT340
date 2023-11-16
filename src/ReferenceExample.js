import { useState, useEffect, useRef } from "react";

export default function ReferenceExample() {
  const [inputValue, setInputValue] = useState([]);
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;

    let val = [...inputValue];
    val.shift();
    setInputValue(val);
  }, [inputValue]);

  function test() {
    let val = [...inputValue];
    val.push((Math.floor(Math.random() * (100 - 1) ) + 1));
    setInputValue(val);
  }


  return (
    <>
      <button onClick={test}>Button</button>
      {inputValue.map((numbers) => (
        <p>{numbers}</p>
      ))}
      <h1>Render Count: {count.current}</h1>
    </>
  );
}
