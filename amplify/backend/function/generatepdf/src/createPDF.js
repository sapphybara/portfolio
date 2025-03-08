/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const { Buffer } = require('buffer');
const generateResumeHTML = require("./generateResumeHTML");

module.exports = {
  generatePDF: async (data, apiKey) => {
    // Extract the sandboxMode parameter
    const { isSandboxMode, ...resumeData } = data;

    // Properly handle boolean or string values for sandboxMode
    const shouldUseSandbox = isSandboxMode === true || isSandboxMode === "true";

    // Always use sandbox unless we're in main environment AND sandbox mode is explicitly false
    const useSandbox = process.env.ENV !== "main" || shouldUseSandbox;

    console.log(`Environment: ${process.env.ENV}, Requested sandbox mode: ${isSandboxMode}, Using sandbox: ${useSandbox}`);

    const html = generateResumeHTML(resumeData);

    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: html,
        sandbox: useSandbox,
        margin: { top: "40px" },
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    return Buffer.from(await response.arrayBuffer());
  }
};
