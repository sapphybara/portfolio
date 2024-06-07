/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: "us-west-1" });

// eslint-disable-next-line no-undef
exports.handler = async (_event, context) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["sapphyra.wiser@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "This is a testing email from the lambda function" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "admin@sapphyrawiser.com",
  });

  try {
    let response = await ses.send(command);
    return response;
  }
  catch (error) {
    // todo error handling.
    console.error("error!", error)
  }
  finally {
    context.done(null, 'Successfully processed DynamoDB record');
  }
};
