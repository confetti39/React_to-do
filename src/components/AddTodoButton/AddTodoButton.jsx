import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import styles from "./AddTodoButton.module.css";

export default function AddTodoButton() {
  const navigate = useNavigate();
  const handleClickAddButton = () => {
    navigate(`/addTodo`);
  };
  return (
    <Fab
      className={styles.button}
      color="secondary"
      aria-label="add"
      onClick={handleClickAddButton}
    >
      <AddIcon />
    </Fab>
  );
}
