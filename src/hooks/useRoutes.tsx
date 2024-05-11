import { RouteObject } from "react-router-dom";
import Admin from "@routes/admin/Admin";
import App from "src/App";
import Error from "@routes/error/Error";
import Home from "@routes/home/Home";
import Portfolio from "@routes/portfolio/Portfolio";
import PortfolioDetail from "@routes/portfolio/detail/PortfolioDetail";
import Resume from "@routes/resume/Resume";
import SignIn from "@components/SignIn";
import AddCreditCardDialog from "@components/AddCreditCardDialog";

export const useRoutes = () => {
  const routes = [
    {
      id: "root",
      path: "/",
      lazy: () => import("@routes/lazy"),
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
              lazy: () => import("@routes/portfolio/detail/lazy"),
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
          lazy: () => import("@routes/admin/lazy"),
          children: [
            {
              path: "credit-cards/new",
              element: <AddCreditCardDialog />,
              lazy: () => import("@routes/admin/credit-cards/lazy"),
            },
          ],
        },
        {
          path: "login",
          element: <SignIn />,
          lazy: () => import("@routes/login/lazy"),
        },
        {
          path: "logout",
          lazy: () => import("@routes/logout/lazy"),
        },
      ],
    },
  ] as RouteObject[];

  return routes;
};
