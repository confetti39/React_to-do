import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    navigate(`/`);
  };
  return (
    <>
      <h1>ADD TODO PAGE</h1>
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
          label="ADD TODO"
          variant="filled"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleSubmit}
        >
          ADD
        </Button>
      </Box>
    </>
  );
}
