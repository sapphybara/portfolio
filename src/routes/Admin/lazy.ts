import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { isAuthenticated } from "@utils/AuthProvider";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!(await isAuthenticated())) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect(`/login?${params.toString()}`);
  }
  return null;
};
