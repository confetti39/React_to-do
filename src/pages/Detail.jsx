import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header/Header";
import DetailButtons from "../components/DetailButtons";
import Todo from "../components/Todo";

export default function Detail() {
  const { todoId } = useParams();
  const {
    isLoading,
    error,
    data: todo,
  } = useQuery(["todo", todoId], async () => {
    console.log("fetching...");
    return fetch(`https://dummyjson.com/todos/${todoId}`).then((res) =>
      res.json()
    );
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Header />
      <DetailButtons />
      <Todo todo={todo} todoId={todoId} isTodoList={false} />
    </>
  );
}
