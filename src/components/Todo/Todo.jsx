import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import styles from "./Todo.module.css";

export default function Todo({ todo, pageId, isTodoList }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(todo.completed);
  const handleUpdateTodo = (checked, id) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => setChecked(res.completed)) //false
      .then(
        navigate(
          isTodoList
            ? `/page/${pageId === undefined ? 1 : parseInt(pageId)}`
            : `/todos/${todo.id}`
        )
      )
      .then(console.log());
  };
  const handleClickTodo = (id) => {
    navigate(`/todos/${id}`);
  };

  return (
    <div key={todo.id} className={styles.todo}>
      <Checkbox
        checked={checked}
        label={todo.todo}
        color="secondary"
        onChange={() => handleUpdateTodo(checked, todo.id)}
      />
      <span
        className={`${styles.todoContent} ${checked ? styles.checked : ""}`}
        onClick={() => handleClickTodo(todo.id)}
      >
        {todo.todo}
      </span>
    </div>
  );
}
