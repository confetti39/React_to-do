import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TodoInput from "../components/TodoInput";

export default function DetailButtons() {
  const { todoId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const handleEditTodo = async () => {
    setEditMode((prev) => !prev);
  };
  const handleDeleteTodo = async () => {
    alert("삭제하시겠습니까?");
    fetch(`https://dummyjson.com/todos/${todoId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  };
  return (
    <div>
      <IconButton color="primary" aria-label="edit">
        <EditIcon onClick={handleEditTodo} />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={handleDeleteTodo} />
      </IconButton>
      {editMode ? (
        <TodoInput type="EDIT" todoId={todoId} setEditMode={setEditMode} />
      ) : null}
    </div>
  );
}
