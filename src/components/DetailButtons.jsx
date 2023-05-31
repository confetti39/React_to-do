import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TodoInput from "./TodoInput/TodoInput";

export default function DetailButtons() {
  const { todoId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const handleEditTodo = () => {
    setEditMode((prev) => !prev);
  };
  const handleDeleteTodo = async () => {
    alert("삭제하시겠습니까?");
    try {
      const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
        method: "DELETE",
      });
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <IconButton onClick={handleEditTodo} color="primary" aria-label="edit">
        <EditIcon color="secondary" />
      </IconButton>
      <IconButton onClick={handleDeleteTodo} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      {editMode ? (
        <TodoInput type="EDIT" todoId={todoId} setEditMode={setEditMode} />
      ) : null}
    </div>
  );
}
