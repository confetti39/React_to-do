import React from "react";
import TodoList from "../../components/TodoList/TodoList";
import Header from "../../components/Header/Header";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <Header />
        <TodoList />
      </div>
      <AddTodoButton className={styles.button} />
    </>
  );
}
