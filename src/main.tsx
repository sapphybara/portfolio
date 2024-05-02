import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import App from "./App.tsx";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
// Supports weights 300-800
import "@fontsource-variable/merriweather-sans";
import createCustomTheme from "@theme/theme.ts";
import Home from "@routes/home/Home.tsx";
import Portfolio from "@routes/portfolio/Portfolio.tsx";
import PortfolioDetail from "@routes/portfolio/detail/PortfolioDetail.tsx";
import Resume from "@routes/resume/Resume.tsx";
import Error from "@routes/error/Error.tsx";
import Admin from "@routes/Admin/Admin.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import ThemeProvider, {
  ThemeModeContext,
} from "./context/ThemeModeContext.tsx";
import { getPortfolioDetail } from "./utils/utils.ts";
import "./index.css";

// configure AWS Amplify
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

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
        children: [
          {
            path: ":projectId",
            element: <PortfolioDetail />,
            loader: getPortfolioDetail,
          },
        ],
      },
      {
        path: "resume",
        element: <Resume />,
      },
      { path: "admin", element: <Admin /> },
    ],
  },
] as RouteObject[];
const router = createBrowserRouter(routes);
const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <ThemeModeContext.Consumer>
          {({ mode }) => (
            <MuiThemeProvider theme={createCustomTheme(rootElement, mode)}>
              <CssBaseline enableColorScheme />
              <AuthProvider>
                <RouterProvider router={router} />
              </AuthProvider>
            </MuiThemeProvider>
          )}
        </ThemeModeContext.Consumer>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
