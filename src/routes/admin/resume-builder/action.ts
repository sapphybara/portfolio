import { ActionFunction, json } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { generatePDF } from "@graphql/mutations";

const client = generateClient();

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const isSandboxMode = formData.get("isSandboxMode") === "true";
  const shouldUseTitleForPNNLRole =
    formData.get("shouldUseTitleForPNNLRole") === "true";
  const jobTitle = formData.get("jobTitle") as string;
  const selectedSkills = JSON.parse(formData.get("selectedSkills") as string);
  const experience = JSON.parse(formData.get("experience") as string);
  const education = JSON.parse(formData.get("education") as string);
  const skillLines = JSON.parse(formData.get("skillLines") as string);

  try {
    const response = await client.graphql({
      query: generatePDF,
      variables: {
        data: {
          isSandboxMode,
          jobTitle,
          selectedSkills,
          skillLines,
          experience,
          education,
          shouldUseTitleForPNNLRole,
        },
      },
    });

    return json(response.data.generatePDF);
  } catch (error) {
    console.error("PDF Generation failed:", error);
    return json({ error: "Failed to generate PDF" }, { status: 500 });
  }
};

export default action;
