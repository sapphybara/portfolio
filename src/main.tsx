import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import App from "./App.tsx";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
// Supports weights 300-800
import '@fontsource-variable/merriweather-sans';
import createCustomTheme from "@theme/theme.ts";
import Home from "@routes/home/Home.tsx";
import Portfolio from "@routes/portfolio/Portfolio.tsx";
import Resume from "@routes/resume/Resume.tsx";
import Error from "@routes/error/Error.tsx";
import "./index.css";

const routes = [
  {
    path: "/",
    get element() {
      return <App routes={routes} />;
    },
    get errorElement() {
      return <Error routes={routes} />;
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createCustomTheme(rootElement)}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
