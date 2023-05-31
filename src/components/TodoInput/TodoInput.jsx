import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import styles from "./TodoInput.module.css";

export default function AddTodoInput({ type, todoId, setEditMode }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    switch (type) {
      case "ADD":
        try {
          const res = await fetch("https://dummyjson.com/todos/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              todo: text,
              completed: false,
              userId: 5,
            }),
          });
          console.log(await res.json());
          e.preventDefault();
          setText("");
          navigate(`/`);
        } catch (err) {
          console.log(err);
        }
        break;

      case "EDIT":
        try {
          const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              todo: text,
            }),
          });
          console.log(await res.json());
          e.preventDefault();
          setText("");
          setEditMode(false);
        } catch (err) {
          console.log(err);
        }
        break;

      default:
        console.log("error!");
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      className={styles.box}
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={styles.textField}
        id="filled-basic"
        label={`${type} TODO`}
        variant="filled"
        color="secondary"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        variant="contained"
        startIcon={<AddIcon />}
        color="secondary"
        onClick={handleSubmit}
      >
        {type}
      </Button>
    </Box>
  );
}
