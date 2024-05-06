import { CssBaseline, ThemeProvider } from "@mui/material";
import createCustomTheme from "@theme/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeModeContext } from "./ThemeModeContext";
import { useRoutes } from "@hooks/useRoutes";

interface AppProviderProps {
  rootElement: HTMLElement;
}

const AppProvider = ({ rootElement }: AppProviderProps) => {
  const routes = useRoutes();
  const router = createBrowserRouter(routes);

  return (
    <ThemeModeContext.Consumer>
      {({ mode }) => (
        <ThemeProvider theme={createCustomTheme(rootElement, mode)}>
          <CssBaseline enableColorScheme />
          <RouterProvider router={router} />
        </ThemeProvider>
      )}
    </ThemeModeContext.Consumer>
  );
};

export default AppProvider;
