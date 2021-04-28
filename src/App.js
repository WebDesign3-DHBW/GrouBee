import { Router } from "@reach/router";
import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./components/Home/Home";
// import ToDo from "./components/ToDo/ToDo";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeLight from "./theme/themeLight";

function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <RecoilRoot>
        <Router>
          <Home path="/" default />
          {/* <ToDo path="todo" /> */}
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
