import React, { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

const Assignment1 = () => {
  const [input, setInput] = useState(0);

  const expensiveValue = useMemo(() => {
    let a = 1;
    for (let i = 1; i <= input; i++) {
      a *= i;
    }
    return a;
  }, [input]);

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Calculated Value: {expensiveValue}</p>
    </div>
  );
};

export default Assignment1;
