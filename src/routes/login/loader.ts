import { LoaderFunction, redirect } from "react-router-dom";
import { isAuthenticated } from "@utils/AuthProvider";

const loader: LoaderFunction = async () => {
  if (await isAuthenticated()) {
    return redirect("/");
  }
  return null;
};

export default loader;
