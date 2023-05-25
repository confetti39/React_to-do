import React from "react";
import TodoList from "../components/TodoList";
import Header from "../components/Header/Header";
import AddTodoButton from "../components/AddTodoButton/AddTodoButton";

export default function Home() {
  return (
    <>
      <Header />
      <AddTodoButton />
      <TodoList />
    </>
  );
}
