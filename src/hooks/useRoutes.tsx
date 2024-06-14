import { RouteObject, redirect } from "react-router-dom";
import App from "@/App";
import Error from "@routes/error/Error";
import Admin from "@routes/admin/Admin";
import Resume from "@routes/resume/Resume";
import Home from "@routes/home/Home";
import rootLoader from "@routes/loader";
import adminLoader from "@routes/admin/loader";
import { useState } from "react";
import { TabState } from "types/global";

interface TabData extends Pick<TabState, "maxTabHeight" | "tabIdx"> {}

export const useRoutes = () => {
  const [tabState, setTabState] = useState<TabData>({
    maxTabHeight: 0,
    tabIdx: 0,
  });

  const tabStateSetter = (key: keyof TabData) => (value: number) => {
    setTabState((prev) => ({ ...prev, [key]: value }));
  };

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
          element: (
            <Home
              maxTabHeight={tabState.maxTabHeight}
              setMaxTabHeight={tabStateSetter("maxTabHeight")}
              setTabIdx={tabStateSetter("tabIdx")}
              tabIdx={tabState.tabIdx}
            />
          ),
        },
        {
          path: "portfolio",
          loader: ({ params }) => {
            if (params.projectId) {
              return null;
            }
            return redirect("/#portfolio");
          },
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
          path: "contact",
          lazy: () => import("@routes/contact/lazy"),
        },
        {
          path: "admin",
          element: <Admin />,
          loader: adminLoader,
          children: [
            {
              path: "credit-cards/new",
              lazy: () => import("@routes/admin/credit-cards/new/lazy"),
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
