import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";

const ToDos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (response) => {
        const data = await response.json();
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured");
      });
  }, []);

  return (
    <>
      <div style={{ gap: 10 }}>
        {todos.map((todoItem, index) => (
          <ToDoItem key={index} todoItem={todoItem} />
        ))}
      </div>
    </>
  );
};

export default ToDos;
