/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: "us-west-1" });

// eslint-disable-next-line no-undef
exports.handler = async (event, _context, callback) => {
  const contactData = event.Records[0].dynamodb.NewImage;
  const {
    email: { S: email },
    name: { S: name },
    message: { S: message },
    subject: { S: subject },
  } = contactData;

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["sapphyra.wiser@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Data: `
            <html>
              <head></head>
              <body>
                <h2>Message from ${name}: &lt;${email}&gt;</h2>
                <p>${message}</p>
              </body>
            </html>
          `
        },
      },
      Subject: { Data: subject },
    },
    Source: "admin@sapphyrawiser.com",
    ReplyToAddresses: [email],
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
    callback(null, 'Successfully processed DynamoDB record');
  }
};
