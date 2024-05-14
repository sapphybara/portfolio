import { RouteObject } from "react-router-dom";
import App from "@/App";
import Error from "@routes/error/Error";
import Portfolio from "@routes/portfolio/Portfolio";
import Admin from "@routes/admin/Admin";
import Resume from "@routes/resume/Resume";
import Home from "@routes/home/Home";

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
          element: <Admin />,
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
