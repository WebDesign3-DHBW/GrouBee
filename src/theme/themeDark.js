import {
  // https://stackoverflow.com/a/64135466
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import themeGlobal from "./theme";
const typography = themeGlobal.typography;
const overrides = themeGlobal.overrides;

let themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fdcb6e",
    },
    secondary: {
      main: "#6dacfc",
    },
  },
  typography,
  overrides,
});

export default themeDark = responsiveFontSizes(themeDark);
