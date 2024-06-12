import { createContactForm } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { ActionFunction } from "react-router-dom";
import { CreateContactFormInput } from "@/API";

const client = generateClient();

const action: ActionFunction = async ({ request }) => {
  const formState = Object.fromEntries(await request.formData()) as {
    [key in keyof Exclude<CreateContactFormInput, "id">]: string;
  };

  try {
    await client.graphql({
      query: createContactForm,
      variables: {
        input: formState,
      },
      authMode: "iam",
    });
  } catch (err) {
    console.error("error creating new contact form:", err);
    return { status: (err as Error).message };
  }
  return { status: "success" };
};

export default action;
