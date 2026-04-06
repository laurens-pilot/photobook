"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#08C225",
      dark: "#006E0F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1E6D1D",
    },
    background: {
      default: "#1a1c1d",
      paper: "#242627",
    },
    text: {
      primary: "#E2E2E4",
      secondary: "#888",
    },
    error: {
      main: "#ba1a1a",
    },
  },
  typography: {
    fontFamily: "var(--font-manrope), sans-serif",
    h1: {
      fontFamily: "var(--font-manrope), sans-serif",
      fontWeight: 800,
    },
    h2: {
      fontFamily: "var(--font-manrope), sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "var(--font-manrope), sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "var(--font-manrope), sans-serif",
    },
    body1: {
      fontFamily: "var(--font-manrope), sans-serif",
    },
    body2: {
      fontFamily: "var(--font-manrope), sans-serif",
    },
    button: {
      fontFamily: "var(--font-manrope), sans-serif",
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "10px 24px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #006E0F 0%, #08C225 100%)",
          boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #005309 0%, #06A81F 100%)",
          },
        },
      },
    },
  },
});

export default theme;
