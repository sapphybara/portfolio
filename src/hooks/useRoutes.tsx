import { RouteObject } from "react-router-dom";
import App from "@/App";
import Error from "@routes/error/Error";
import Home from "@routes/home/Home";
import Resume from "@routes/resume/Resume";
import Portfolio from "@routes/portfolio/Portfolio";

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
          lazy: () => import("@routes/admin/lazy"),
          children: [
            {
              path: "credit-cards/new",
              lazy: () => import("@routes/admin/credit-cards/lazy"),
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
