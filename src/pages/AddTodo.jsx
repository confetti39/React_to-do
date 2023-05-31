import React from "react";
import TodoInput from "../components/TodoInput/TodoInput";
import Header from "../components/Header/Header";

export default function AddTodo() {
  return (
    <>
      <Header />
      <TodoInput type="ADD" />
    </>
  );
}
