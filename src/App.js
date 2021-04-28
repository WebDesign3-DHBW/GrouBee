import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeLight from "./theme/themeLight";
import themeDark from "./theme/themeDark";
import useMediaQueryUI from "@material-ui/core/useMediaQuery";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const prefersDarkMode = useMediaQueryUI("(prefers-color-scheme: dark)");
  return (
    <ThemeProvider theme={prefersDarkMode ? themeDark : themeLight}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
