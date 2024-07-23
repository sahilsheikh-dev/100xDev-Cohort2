import React, { useContext } from "react";
import { CountContext } from "../context/countContext";

const DisplayCount = () => {
  const { count, setCount } = useContext(CountContext);

  return (
    <>
      <p>Count is: {count}</p>
    </>
  );
};

export default DisplayCount;
