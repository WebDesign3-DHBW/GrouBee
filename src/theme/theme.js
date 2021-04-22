const themeGlobal = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: 20,
      letterSpacing: "0.15px",
    },
    h2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: "0.1px",
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 14,
      letterSpacing: "0.5%",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: 12,
    },
    caption: {
      fontWeight: 500,
    },
    overline: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiPaper: {
      elevation5: {
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.02), 0px 1px 12px rgba(0, 0, 0, 0.12)", // Box Shadow aus Figma
      },
    },
    MuiCardMedia: {
      media: {
        borderRadius: 8,
      },
    },
  },
};

export default themeGlobal;
