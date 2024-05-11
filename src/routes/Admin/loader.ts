import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { isAuthenticated } from "@utils/AuthProvider";
import { generateClient } from "aws-amplify/api";
import { listCreditCards } from "src/graphql/queries";

const client = generateClient();

const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!(await isAuthenticated())) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect(`/login?${params.toString()}`);
  }

  try {
    const ccData = await client.graphql({
      query: listCreditCards,
    });
    return ccData.data.listCreditCards.items;
  } catch (err) {
    console.error("error fetching credit cards", err);
    return null;
  }
};

export default loader;
