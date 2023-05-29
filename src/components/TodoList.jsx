import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChangePage = (e) => setPage(parseInt(e.target.outerText));
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
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery(
    ["todos"],
    async () => {
      console.log("fetching...");
      return fetch(`https://dummyjson.com/todos?limit=150`).then((res) =>
        res.json()
      );
    }
    // {
    //   staleTime: 1000 * 60 * 5,
    // }
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  return (
    <nav aria-label="secondary mailbox folders">
      <FormGroup>
        {todos.todos.map((todo) => {
          return (
            <FormControlLabel
              key={todo.id}
              checked={todo.completed}
              control={<Checkbox onClick={() => handleClickTodo(todo.id)} />}
              label={todo.todo}
              onChange={() => handleUpdateTodo(todo.completed, todo.id)}
            />
          );
        })}
      </FormGroup>
      <Pagination
        count={todos.total / todos.limit}
        color="secondary"
        defaultPage={1}
        page={page}
        onChange={handleChangePage}
      />
    </nav>
  );
}
