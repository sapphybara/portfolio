import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { isAuthenticated, signIn, signUp } from "@utils/AuthProvider";

/**
 * Handles the login action.
 *
 * @param args the arguments for the loader function.
 * @returns A promise that resolves to an object with an optional error property or void.
 */
export const action = async ({ request }: LoaderFunctionArgs) => {
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
};

export const loader = async () => {
  if (await isAuthenticated()) {
    return redirect("/");
  }
  return null;
};
