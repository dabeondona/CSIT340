import React, {useRef} from 'react';


export default function ParentComponent() {

  const myRef = useRef();

  const handleButtonClick = () => {
    myRef.current.innterHTML = "State Changed";
  };

  return (
    <div>
      <p ref={myRef}>Initial State</p>
      <button onclick={handleButtonClick}>Change State</button>
    </div>
  );
}