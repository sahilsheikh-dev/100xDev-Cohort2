import React, { useContext } from "react";
import { CountContext } from "../context/countContext";

const DecreaseButton = () => {
  const { count, setCount } = useContext(CountContext);

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <>
      <button
        style={{ margin: "auto 10px" }}
        onClick={() => {
          decreaseCount();
        }}
      >
        Decrease Count
      </button>
    </>
  );
};

export default DecreaseButton;
