import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "../../components/Header/Header";
import DetailButtons from "../../components/DetailButtons";
import Todo from "../../components/Todo/Todo";
import styles from "./Detail.module.css";

export default function Detail() {
  const { todoId } = useParams();
  const {
    isLoading,
    error,
    data: todo,
  } = useQuery(
    ["todo", parseInt(todoId)],
    async () => {
      console.log("fetching...");
      return fetch(`https://dummyjson.com/todos/${todoId}`).then((res) =>
        res.json()
      );
    },
    {
      // staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Header style={{ display: "none" }} />
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="secondary" />
        </Box>
      </div>
    );
  if (error) return <p>{error}</p>;
  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <Todo className={styles.todo} todo={todo} isTodoList={false} />
      <DetailButtons className={styles.buttons} />
    </div>
  );
}
