import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import App from "@/App";
import Error from "@routes/error/Error";

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
          Component: lazy(() => import("@routes/home/Home")),
        },
        {
          path: "portfolio",
          children: [
            {
              path: ":projectId",
              lazy: () => import("@routes/portfolio/detail/lazy"),
            },
          ],
          Component: lazy(() => import("@routes/portfolio/Portfolio")),
        },
        {
          path: "resume",
          Component: lazy(() => import("@routes/resume/Resume")),
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
