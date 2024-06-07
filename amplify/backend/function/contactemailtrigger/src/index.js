// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: "us-west-1" });

// eslint-disable-next-line no-undef
exports.handler = async (event) => {
  const { toAddress } = event;
  console.log(event, toAddress);

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Text: { Data: "This is a testing email from the lambda function" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "sapphyra.wiser@gmail.com",
  });

  try {
    let response = await ses.send(command);
    // process data.
    console.log(response);
    return response;
  }
  catch (error) {
    // todo error handling.
    console.log("error!", error)
  }
  finally {
    // todo finally.
  }
};