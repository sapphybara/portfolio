/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["pdfshiftApiKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// eslint-disable-next-line no-undef
const { SSMClient, GetParametersCommand } = require("@aws-sdk/client-ssm");
// eslint-disable-next-line no-undef
const { generatePDF } = require("./createPDF");

const client = new SSMClient();

const command = new GetParametersCommand({
  Names: ["pdfshiftApiKey"].map(
    // eslint-disable-next-line no-undef
    (secretName) => process.env[secretName]
  ),
  WithDecryption: true,
});

// eslint-disable-next-line no-undef
exports.handler = async (event) => {
  try {
    // Get PDFShift API key from Parameter Store
    const { Parameters } = await client.send(command);
    if (!Parameters) {
      throw new Error("No parameters found in Parameter Store");
    }

    const apiKey = Parameters[0].Value;

    // Get data from GraphQL mutation
    const data = event.arguments.data;

    // Generate PDF with API key
    const pdfBuffer = await generatePDF(data, apiKey);

    // Return just the base64 string as the url
    return {
      url: `data:application/pdf;base64,${pdfBuffer.toString('base64')}`
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
