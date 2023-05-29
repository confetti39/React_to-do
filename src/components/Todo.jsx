import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

export default function Todo({ todo }) {
  const navigate = useNavigate();
  const handleUpdateTodo = async (checked, id) => {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !checked,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  const handleClickTodo = (id) => {
    navigate(`/todos/${id}`);
  };

  return (
    <div key={todo.id}>
      <Checkbox
        checked={todo.completed}
        label={todo.todo}
        onChange={() => handleUpdateTodo(todo.completed, todo.id)}
      />
      <span onClick={() => handleClickTodo(todo.id)}>{todo.todo}</span>
    </div>
  );
}
