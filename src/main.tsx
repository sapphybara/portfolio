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
import createCustomTheme from "@theme/theme.ts";
import Home from "@routes/Home.tsx";
import Portfolio from "@routes/Portfolio.tsx";
import Contact from "@routes/Contact.tsx";
import "./index.css";

const routes = [
  {
    path: "/",
    get element() {
      return <App routes={routes} />;
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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createCustomTheme(rootElement)}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
