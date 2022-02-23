import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root")
);
