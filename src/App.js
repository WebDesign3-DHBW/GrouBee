import { RecoilRoot } from "recoil";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import CssBaseline from "@material-ui/core/CssBaseline";
import globalTheme from "./theme/theme";
import Routes from "./routes/Routes";

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1025px)",
  });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 1024px )",
  });

  return (
    <>
      {isDesktopOrLaptop && (
        <ThemeProvider theme={globalTheme}>
          <h1>LOL wer entwickelt denn für Desktop 🤪</h1>
        </ThemeProvider>
      )}
      {isMobileDevice && (
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <RecoilRoot>
            <Routes />
          </RecoilRoot>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
