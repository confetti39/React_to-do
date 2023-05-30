import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function AddTodoInput({ type, todoId, setEditMode }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    switch (type) {
      case "ADD":
        fetch("https://dummyjson.com/todos/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: text,
            completed: false,
            userId: 5,
          }),
        })
          .then((res) => res.json())
          .then(console.log);
        e.preventDefault();
        setText("");
        navigate(`/`);
        break;

      case "EDIT":
        fetch(`https://dummyjson.com/todos/${todoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: text,
          }),
        })
          .then((res) => res.json())
          .then((res) => res.todo)
          .then(console.log);
        e.preventDefault();
        setText("");
        setEditMode(false);
        break;

      default:
        console.log("error!");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        label={`${type} TODO`}
        variant="filled"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleSubmit}
      >
        {type}
      </Button>
    </Box>
  );
}
