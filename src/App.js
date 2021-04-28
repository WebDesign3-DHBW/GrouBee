import { Router } from "@reach/router";
import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./components/Home/Home";
import ToDo from "./components/ToDo/ToDo";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeLight from "./theme/themeLight";
import themeDark from "./theme/themeDark";
import useMediaQueryUI from "@material-ui/core/useMediaQuery";

function App() {
  const prefersDarkMode = useMediaQueryUI("(prefers-color-scheme: dark)");
  return (
    <ThemeProvider theme={prefersDarkMode ? themeDark : themeLight}>
      <CssBaseline />
      <RecoilRoot>
        <Router>
          <Home path="/" default />
          <ToDo path="todo" />
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
