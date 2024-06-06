import { ActionFunction } from "react-router-dom";
import { ContactFormField } from "types/global";

const action: ActionFunction = async ({ request }) => {
  const formState = Object.fromEntries(await request.formData()) as {
    [key in ContactFormField["key"]]: string;
  };
  console.log(formState);
  return null;
};

export default action;
