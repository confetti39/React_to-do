import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../components/Header/Header";
import AddTodoInput from "../components/TodoInput";

export default function Detail() {
  const { todoId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");
  const handleEditTodo = async () => {
    setEditMode((prev) => !prev);
  };
  const handleDeleteTodo = async () => {
    fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const {
    isLoading,
    error,
    data: todo,
  } = useQuery(["todo"], async () => {
    console.log("fetching...");
    return fetch(`https://dummyjson.com/todos/${todoId}`).then((res) =>
      res.json()
    );
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Navbar />
      <IconButton color="primary" aria-label="edit">
        <EditIcon onClick={handleEditTodo} />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={handleDeleteTodo} />
      </IconButton>
      {editMode ? <AddTodoInput type="EDIT" /> : null}
      <div>{todo.todo}</div>
    </>
  );
}
