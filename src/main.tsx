import React from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
// Supports weights 300-800
import "@fontsource-variable/merriweather-sans";
import ThemeProvider from "@context/ThemeModeContext.tsx";
import AppProvider from "@context/AppProvider.tsx";
import "./index.css";

// configure AWS Amplify
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <AppProvider rootElement={rootElement} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
