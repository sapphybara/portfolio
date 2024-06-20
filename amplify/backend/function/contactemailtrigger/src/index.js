/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// eslint-disable-next-line no-undef
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: "us-west-1" });
// eslint-disable-next-line no-undef
const dayjs = require("dayjs");

// eslint-disable-next-line no-undef
exports.handler = async (event, _context, callback) => {
  const contactData = event.Records[0].dynamodb.NewImage;
  const {
    createdAt: { S: createdAt },
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
                <h3>Message from ${name}: &lt;${email}&gt;</h3>
                <p>Received on ${dayjs(createdAt).format('dddd, MMMM D, [at] h:mma')}.</p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              </body>
            </html>
          `,
        },
      },
      Subject: { Data: subject },
    },
    Source: "Website Contact <admin@sapphyrawiser.com>",
    ReplyToAddresses: [`${name} <${email}>`],
  });

  try {
    let response = await ses.send(command);
    return response;
  } catch (error) {
    // todo error handling.
    console.error("error!", error);
  } finally {
    callback(null, "Successfully processed DynamoDB record");
  }
};
