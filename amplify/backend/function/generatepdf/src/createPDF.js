/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const { Buffer } = require('buffer');
const generateResumeHTML = require("./generateResumeHTML");

module.exports = {
  generatePDF: async ({ isSandboxMode, ...resumeData }, apiKey) => {
    const html = generateResumeHTML(resumeData);

    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: html,
        sandbox: process.env.ENV !== "main" || isSandboxMode,
        margin: { top: "40px" },
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    return Buffer.from(await response.arrayBuffer());
  }
};
