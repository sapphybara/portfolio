import { generateClient } from "aws-amplify/api";
import { ActionFunction, json, redirect } from "react-router-dom";
import { isCreditCard } from "@utils/typeGuards";
import { CreateCreditCardInput } from "src/API";
import { createCreditCard } from "src/graphql/mutations";

const client = generateClient();

const action: ActionFunction = async ({ request }) => {
  const formState = Object.fromEntries(await request.formData()) as {
    [key in Exclude<keyof CreateCreditCardInput, "id" | "score">]: string;
  };

  const ccData = {
    ...formState,
    isEarningInterest: formState.isEarningInterest === "on",
  };

  try {
    if (!isCreditCard(ccData)) {
      return json({ error: "invalid credit card" }, { status: 400 });
    }

    const creditCard = { ...ccData };
    await client.graphql({
      query: createCreditCard,
      variables: {
        input: creditCard,
      },
    });
    return redirect("/admin");
  } catch (err) {
    console.log("error creating new credit card:", err);
    return json({ error: "error creating new credit card" }, { status: 500 });
  }
};

export default action;
