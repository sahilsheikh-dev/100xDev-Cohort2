import React from "react";

const ChangeCompleteStatus = ({ id, completed }) => {
  const changeCompleteStatus = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/changeStatus", {
      method: "PUT",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured");
      });
  };

  return (
    <>
      <button
        className="todo-action-btn"
        style={{ margin: "5px 10px" }}
        onClick={(e) => changeCompleteStatus(e)}
      >
        {completed ? <>Not Complete</> : <>Complete</>}
      </button>
    </>
  );
};

export default ChangeCompleteStatus;
