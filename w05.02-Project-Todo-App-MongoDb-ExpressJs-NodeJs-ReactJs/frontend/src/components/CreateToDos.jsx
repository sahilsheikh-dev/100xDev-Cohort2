import React, { useState } from "react";

const CreateToDos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addToDo = async () => {
    if (!title || !description) {
      alert("Please fill all the fields");
    } else {
      await fetch("http://localhost:3000/createTodo", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured");
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addToDo();
  };

  return (
    <>
      <div
        className="container"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <p style={{ fontSize: "22px", margin: 0 }}>Create To Do</p>
        <form onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="title"
              className="col-md-4 col-form-label text-md-right"
            ></label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              required="required"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="col-md-4 col-form-label text-md-right"
            ></label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              required="required"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add ToDo
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateToDos;
