export const themeGlobal = {
  palette: {
    primary: {
      main: "#fdcb6e",
    },
    secondary: {
      main: "#6dacfc",
    },
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    h1: {
      fontSize: "3.25rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: ".75rem",
      fontWeight: 700,
    },
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 10,
      },
    },
    MuiCardActionArea: {
      root: {
        borderRadius: 10,
      },
    },
    MuiTouchRipple: {
      root: {
        borderRadius: 10,
      },
      child: {
        backgroundColor: "#fdcb6e",
      },
    },
    MuiDivider: {
      root: {
        height: "2px",
      },
    },
  },
};
