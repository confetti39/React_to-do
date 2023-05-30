import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Todo from "./Todo";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TodoList() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(pageId === undefined ? 1 : parseInt(pageId));
  const countPerPage = 30;
  const handleChangePage = (e) => {
    // console.log(
    //   `pageId: ${pageId} type: ${typeof pageId} ${e.target.outerText}`
    // );
    setPage(parseInt(e.target.outerText));
    navigate(`/page/${e.target.outerText}`);
  };
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
