import { RouteObject, redirect } from "react-router-dom";
import Admin from "@routes/Admin/Admin";
import App from "src/App";
import Error from "@routes/error/Error";
import Home from "@routes/home/Home";
import Portfolio from "@routes/portfolio/Portfolio";
import PortfolioDetail from "@routes/portfolio/detail/PortfolioDetail";
import Resume from "@routes/resume/Resume";
import SignIn from "@components/SignIn";
import { useAuth } from "./hooks";
import { getPortfolioDetail } from "@utils/utils";

export const useRoutes = () => {
  const { user } = useAuth();

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
        {
          path: "admin",
          element: <Admin />,
          loader: () => {
            if (!user) {
              return redirect("/login?from=/admin");
            }
            return null;
          },
        },
        {
          path: "login",
          element: <SignIn />,
        },
      ],
    },
  ] as RouteObject[];

  return routes;
};
