import React from "react";
import DeleteTodo from "./DeleteTodo";
import ChangeCompleteStatus from "./ChangeCompleteStatus";

const ToDoItem = ({ todoItem }) => {
  return (
    <>
      <div className="todo-item">
        <h4 style={{ margin: 0 }}>{todoItem.title}</h4>
        <p>{todoItem.description}</p>
        <div className="todo-item__actions">
          <ChangeCompleteStatus
            id={todoItem._id}
            completed={todoItem.completed}
          />
          <DeleteTodo id={todoItem._id} />
        </div>
      </div>
    </>
  );
};

export default ToDoItem;
