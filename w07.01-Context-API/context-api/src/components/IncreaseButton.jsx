import React, { useContext } from "react";
import { CountContext } from "../context/countContext";

const IncreaseButton = () => {
  const { count, setCount } = useContext(CountContext);

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button
        style={{ margin: "auto 10px" }}
        onClick={() => {
          increaseCount();
        }}
      >
        Increase Count
      </button>
    </>
  );
};

export default IncreaseButton;
