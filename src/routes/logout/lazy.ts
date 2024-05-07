import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { signOut } from "@utils/AuthProvider";

export const action = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const from = params.get("from") || "/";

  await signOut();
  return redirect(from);
};
