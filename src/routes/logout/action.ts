import { ActionFunction, redirect } from "react-router-dom";
import { signOut } from "@utils/AuthProvider";

const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const from = params.get("from") || "/";

  await signOut();
  return redirect(from);
};

export default action;
