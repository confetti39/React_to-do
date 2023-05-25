import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChangePage = (e) => setPage(parseInt(e.target.outerText));
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
      <List>
        {todos.todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              onClick={() => handleClickTodo(todo.id)}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={todo.todo} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
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
