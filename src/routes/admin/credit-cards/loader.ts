import { LoaderFunction, defer } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { listCreditCards } from "@graphql/queries";

const client = generateClient();

const loader: LoaderFunction = async () => {
  try {
    const creditCardPromise = client.graphql({
      query: listCreditCards,
    });
    return defer({
      creditCards: creditCardPromise,
    });
  } catch (err) {
    console.error("error fetching credit cards", err);
    return {
      error: (err as Error).message,
    };
  }
};

export default loader;
