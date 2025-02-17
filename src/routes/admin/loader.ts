import { isAuthenticated } from "@utils/AuthProvider";
import { LoaderFunction, redirect } from "react-router-dom";

const loader: LoaderFunction = async ({ request }) => {
  if (!(await isAuthenticated())) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect(`/login?${params.toString()}`);
  }
  return null;
};

export default loader;
