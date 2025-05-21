import { Outlet, RouteObject } from "react-router-dom";
import App from "@/App";
import Error from "@routes/error/ErrorPage";
import Admin from "@routes/admin/Admin";
import Resume from "@routes/resume/Resume";
import Home from "@routes/home/Home";
import rootLoader from "@routes/loader";
import ccLoader from "@routes/admin/credit-cards/loader";
import adminLoader from "@routes/admin/loader";
import CreditCardLoader from "@routes/admin/credit-cards/CreditCardLoader";
import PortfolioWrapper from "@routes/portfolio/PortfolioWrapper";

export const useRoutes = () => {
  const routes = [
    {
      id: "root",
      path: "/",
      loader: rootLoader,
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
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <PortfolioWrapper />,
            },
            {
              path: ":projectId",
              lazy: () => import("@routes/portfolio/detail/lazy"),
            },
          ],
        },
        {
          path: "resume",
          element: <Resume />,
        },
        {
          path: "contact",
          lazy: () => import("@routes/contact/lazy"),
        },
        {
          path: "admin",
          element: <Outlet />,
          loader: adminLoader,
          children: [
            { path: "", element: <Admin /> },
            {
              path: "credit-cards",
              element: <CreditCardLoader />,
              loader: ccLoader,
              children: [
                {
                  path: "new",
                  lazy: () => import("@routes/admin/credit-cards/new/lazy"),
                },
              ],
            },
            {
              path: "resume-builder",
              lazy: () => import("@routes/admin/resume-builder/lazy"),
            },
          ],
        },
        {
          path: "login",
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
