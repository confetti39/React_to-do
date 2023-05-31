import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Todo from "../Todo/Todo";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(pageId === undefined ? 1 : parseInt(pageId));
  const countPerPage = 30;
  const handleChangePage = (event, value) => {
    setPage(value);
    navigate(`/page/${value}`);
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
    <nav aria-label="secondary mailbox folders" className={styles.todoList}>
      {todos.todos.map((todo) => {
        return (
          <div key={todo.id}>
            <Todo todo={todo} pageId={pageId} isTodoList={true} />
          </div>
        );
      })}
      <Pagination
        className={styles.pagination}
        count={Math.ceil(todos.total / countPerPage)}
        color="secondary"
        page={page}
        onChange={handleChangePage}
      />
    </nav>
  );
}
