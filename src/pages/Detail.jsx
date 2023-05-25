import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../components/Header/Header";

export default function Detail() {
  const { todoId } = useParams();
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
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <div>{todo.todo}</div>
    </>
  );
}
