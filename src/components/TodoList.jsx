import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Todo from "./Todo";

export default function TodoList() {
  const [page, setPage] = useState(1);
  const countPerPage = 30;
  const handleChangePage = (e) => setPage(parseInt(e.target.outerText));
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery(
    ["todos", page],
    async () => {
      console.log("fetching...");
      return fetch(
        `https://dummyjson.com/todos?limit=${countPerPage}&skip=${
          countPerPage * (page - 1)
        }`
      ).then((res) => res.json());
    }
    // {
    //   staleTime: 1000 * 60 * 5,
    // }
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  return (
    <nav aria-label="secondary mailbox folders">
      {todos.todos.map((todo) => {
        return (
          <div key={todo.id}>
            <Todo todo={todo} />
          </div>
        );
      })}
      <Pagination
        count={Math.ceil(todos.total / todos.limit)}
        color="secondary"
        defaultPage={page}
        page={page}
        onChange={handleChangePage}
      />
    </nav>
  );
}
