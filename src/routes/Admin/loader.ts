import { LoaderFunction, defer, redirect } from "react-router-dom";
import { isAuthenticated } from "@utils/AuthProvider";
import { generateClient } from "aws-amplify/api";
import { listCreditCards } from "@graphql/queries";

const client = generateClient();

const loader: LoaderFunction = async ({ request }) => {
  if (!(await isAuthenticated())) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect(`/login?${params.toString()}`);
  }

  try {
    const creditCardPromise = client.graphql({
      query: listCreditCards,
    });
    return defer({
      creditCards: creditCardPromise,
    });
  } catch (err) {
    console.error("error fetching credit cards", err);
    return null;
  }
};

export default loader;
