import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import styles from "./TodoInput.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function AddTodoInput({ type, todoId, setEditMode }) {
  const queryClient = new useQueryClient();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const mutation = useMutation(
    async (newTodo) => {
      switch (type) {
        case "ADD":
          const addRes = await fetch("https://dummyjson.com/todos/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
          });
          return addRes;

        case "EDIT":
          await fetch(`https://dummyjson.com/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
          })
            .then((res) => res.json())
            .then((res) => {
              queryClient.setQueryData(["todo", todoId], () => {
                return res;
              });
            });
          break;

        default:
          console.log("error!");
      }
    },
    {
      onSuccess: () => {
        switch (type) {
          case "ADD":
            setText("");
            navigate(`/`);
            break;
          case "EDIT":
            setText("");
            setEditMode(false);
            break;
          default:
            return;
        }
      },
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = () => {
    switch (type) {
      case "ADD":
        mutation.mutate({ todo: text, completed: false, userId: 5 });
        break;
      case "EDIT":
        mutation.mutate({ todo: text });
        break;
      default:
        return;
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
