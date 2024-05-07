import { RouteObject, redirect } from "react-router-dom";
import Admin from "@routes/Admin/Admin";
import App from "src/App";
import Error from "@routes/error/Error";
import Home from "@routes/home/Home";
import Portfolio from "@routes/portfolio/Portfolio";
import PortfolioDetail from "@routes/portfolio/detail/PortfolioDetail";
import Resume from "@routes/resume/Resume";
import SignIn from "@components/SignIn";
import { getPortfolioDetail } from "@utils/utils";
import {
  isAuthenticated,
  signIn,
  signUp,
  signOut,
  username,
} from "@utils/AuthProvider";

export const useRoutes = () => {
  const routes = [
    {
      id: "root",
      path: "/",
      async loader() {
        const user = await username();
        return { user };
      },
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
          lazy: () => import("@routes/Admin/lazy"),
        },
        {
          path: "login",
          element: <SignIn />,
          async action({ request }) {
            const formData = await request.formData();
            const [email, password, confirmPassword, tabIndex, redirectTo] = [
              "email",
              "password",
              "confirmPassword",
              "tabIndex",
              "redirectTo",
            ].map((key) => formData.get(key) as string | null);
            if (!email || !password) {
              return { error: "Email and password are required" };
            }

            let loginFn;
            if (tabIndex === "1") {
              if (!confirmPassword) {
                return { error: "Confirm password is required" };
              }

              if (password !== confirmPassword) {
                return { error: "Passwords do not match" };
              }
              loginFn = signUp;
            } else {
              loginFn = signIn;
            }

            try {
              await loginFn(email, password, confirmPassword as string);
            } catch (error) {
              return { error };
            }

            return redirect(redirectTo || "/");
          },
          async loader() {
            if (await isAuthenticated()) {
              return redirect("/");
            }
            return null;
          },
        },
        {
          path: "logout",
          async action() {
            await signOut();
            return redirect("/");
          },
        },
      ],
    },
  ] as RouteObject[];

  return routes;
};
