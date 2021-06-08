import { RecoilRoot } from "recoil";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import useMediaQueryUI from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { themeGlobal } from "./theme/theme";
import Routes from "./routes/Routes";
import Desktop from "./components/Desktop/Desktop";
import { Router } from "@reach/router";
import { DesktopImpressum, DesktopDatenschutz } from "./components/Desktop/DesktopLegal";

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1025px)",
  });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 1024px )",
  });

  const prefersDarkMode = useMediaQueryUI("(prefers-color-scheme: dark)");

  const darkTheme = responsiveFontSizes(
    createMuiTheme(
      {
        palette: {
          type: "dark",
          primary: {
            main: "#fdcb6e",
          },
          secondary: {
            main: "#6dacfc",
            dark: "#FFFFFF",
          },
        },
      },
      themeGlobal
    )
  );
  const lightTheme = responsiveFontSizes(
    createMuiTheme(
      {
        palette: {
          primary: {
            main: "#fcb93c",
          },
        },
      },
      themeGlobal
    )
  );

  return (
    <>
      {isDesktopOrLaptop && (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
          <Router>
            <Desktop path="/" default />
            <DesktopImpressum path="/impressum" />
            <DesktopDatenschutz path="/datenschutz" />
          </Router>
        </ThemeProvider>
      )}
      {isMobileDevice && (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
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
