

export default function storage() {
      // if (jsonData) {
  //   const colorDictionary = {
  //     "Alpha": "green",
  //     "Bravo": "blue",
  //     "Charlie": "red",
  //     "Delta": "purple",
  //     "Echo": "orange",
  //     "Foxtroxt": "cyan",
  //     "Golf": "magenta",
  //     "Hotel": "lightgreen",
  //     "India": "lightblue",
  //     "Juliet": "pink",
  //     "Kilo": "lime",
  //     "Lima": "teal",
  //     "Mike": "indigo",
  //     "November": "yellow",
  //     "Oscar": "brown",
  //     "Papa": "gray",
  //     "Quebec": "darkgreen",
  //     "Romeo": "darkblue",

  
  const output = validatedValues.reduce((result, value) => {
    if (value in jsonData) {
      const arrayValues = jsonData[value];

      arrayValues.forEach((val) => {
        if (val in colorDictionary) {
          matchingList[Object.keys(colorDictionary).indexOf(val)] = 1;
        }
      });

      const formattedValues = arrayValues.map((val, index) => {
        if (matchingList[index] === 1) {
          return <span style={{ color: colorDictionary[val] }}>{val}</span>;
        } else {
          return <span className="not-matched">{val}</span>;
        }
      });

      result.push(
        <div key={value}>
          {formattedValues.join(" <-> ")}
        </div>
      );
    }
    return result;
  }, []);

//     // Join the output array with a comma separator and set it as a string
//     const outputString = output;
//     setOutputData(outputString); // OutputData is now an array of JSX elements

//     // Clear the validatedValues state
//     setValidatedValues([]);
//   }
// }


//       const outputString = output.join(", ");
//       console.log(outputString)
//       setOutputData(outputString);
//       setValidatedValues([]);
  //   };

//   const matchingList = Array.from({ length: Object.keys(colorDictionary).length }, () => 0);
}