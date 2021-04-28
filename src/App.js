import { Router } from "@reach/router";
import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeLight from "./theme/themeLight";
import ToDo from "./components/ToDo/ToDo";
import Media from "./components/Media/Media";
import Finance from "./components/Finance/Finance";
import Calendar from "./components/Calendar/Calendar";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <RecoilRoot>
        <Router>
          <Home path="/" default />
          <ToDo path="todo" />
          <Media path="media" />
          <Finance path="finance" />
          <Calendar path="calendar" />
          <Settings path="settings" />
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
