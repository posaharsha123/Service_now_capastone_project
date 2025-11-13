import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";
import { ThemeProvider, useTheme } from "./ThemeContext.jsx";

function MuiThemeWrapper({ children }) {
  const { darkMode } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",

          // Better color choices (more modern & softer)
          primary: { main: darkMode ? "#64b5f6" : "#1565c0" }, 
          secondary: { main: darkMode ? "#ce93d8" : "#7e57c2" },

          background: {
            default: darkMode ? "#0f172a" : "#f4f7fb",
            paper: darkMode ? "#1e293b" : "#ffffff",
          },

          text: {
            primary: darkMode ? "#708fb8ff" : "#1e293b",
            secondary: darkMode ? "rgba(119, 30, 30, 1)" : "#1b64caff",
          },
        },

        shape: {
          borderRadius: 10, // rounded UI across the app
        },

        typography: {
          fontFamily: `"Inter", "Roboto", sans-serif`,
          h5: {
            fontWeight: 600,
          },
          button: {
            textTransform: "none",
            fontWeight: "bold",
          },
        },
      }),
    [darkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MuiThemeWrapper>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </MuiThemeWrapper>
    </ThemeProvider>
  </StrictMode>
);
