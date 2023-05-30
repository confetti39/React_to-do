import React from "react";
import AddTodoInput from "../components/TodoInput";
import Header from "../components/Header/Header";

export default function AddTodo() {
  return (
    <>
      <Header />
      <AddTodoInput type="ADD" />
    </>
  );
}
