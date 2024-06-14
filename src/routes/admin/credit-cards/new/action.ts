import { generateClient } from "aws-amplify/api";
import { ActionFunction, redirect } from "react-router-dom";
import { isCreditCard } from "@utils/typeGuards";
import { CreateCreditCardInput } from "@/API";
import { createCreditCard } from "@graphql/mutations";

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
      return {
        status: "error",
        message: "Invalid credit card data, please fill in all required fields",
      };
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
    if (typeof err === "object" && err !== null && "errors" in err) {
      const errors = (err as { errors: Error[] }).errors;
      return {
        status: "error",
        message: errors.map((e) => e.message).join(",\n"),
      };
    }

    return {
      status: "error",
      message:
        "Credit card could not be created right now, please try again later.",
    };
  }
};

export default action;
