import { CssBaseline, ThemeProvider } from "@mui/material";
import createCustomTheme from "@theme/theme";
import AuthProvider from "./AuthProvider";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Admin from "@routes/Admin/Admin";
import App from "src/App";
import Error from "@routes/error/Error";
import Home from "@routes/home/Home";
import Portfolio from "@routes/portfolio/Portfolio";
import PortfolioDetail from "@routes/portfolio/detail/PortfolioDetail";
import Resume from "@routes/resume/Resume";
import { getPortfolioDetail } from "@utils/utils";
import { ThemeModeContext } from "./ThemeModeContext";

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

interface AppProviderProps {
  rootElement: HTMLElement;
}

const AppProvider = ({ rootElement }: AppProviderProps) => {
  return (
    <ThemeModeContext.Consumer>
      {({ mode }) => (
        <ThemeProvider theme={createCustomTheme(rootElement, mode)}>
          <CssBaseline enableColorScheme />
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      )}
    </ThemeModeContext.Consumer>
  );
};

export default AppProvider;
