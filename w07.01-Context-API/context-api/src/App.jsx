import { useState } from "react";
import "./App.css";
import DecreaseButton from "./components/DecreaseButton";
import DisplayCount from "./components/DisplayCount";
import IncreaseButton from "./components/IncreaseButton";
import { CountContext } from "./context/countContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Context API Example</h1>

      {/* 
          1. create a context file which we created context/countContext.jsx and export the value (count as a variable and setCount as an empty function to update the calue) which we want to use
          2. create a state of count and wrap components that wants to use the teleported value inside a provide with the count state (const [count, setCount] = useState(0);)
          3. to display/use the value, use const {count, setCount} = useContext(CountContext); inside the chile componet to use the count variable
          4. to update the value, need to use setCount to update the value
          5. Hence to get the value, we dont have to pass down the count as a prop throught out the project
       */}

      <CountContext.Provider value={{ count, setCount }}>
        <DisplayCount />
        <DecreaseButton />
        <IncreaseButton />
      </CountContext.Provider>
    </>
  );
}

export default App;
