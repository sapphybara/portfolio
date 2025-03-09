/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const { Buffer } = require('buffer');
const generateResumeHTML = require("./generateResumeHTML");
const { createCanvas } = require("canvas");

/**
 * Computes how many lines the skills list will occupy
 * in a flex container with wrapping.
 *
 * @param {string[]} skills - Array of skill strings.
 * @param {number} containerWidth - Effective width (in pixels) of the skills container.
 * @returns {number} - Number of lines the skills list will take.
 */
function computeSkillLines(skills, containerWidth) {
  // Create a canvas element to measure text width accurately.
  const canvas = createCanvas(200, 200);
  const context = canvas.getContext("2d");

  // Set the font to match your CSS:
  // CSS: font-size: 14px; font-weight: bold; font-family: Lato
  context.font = "bold 14px Lato";

  // Calculate horizontal additions from CSS:
  // padding: 6px top/bottom, 12px left/right. We care about left/right => 12*2 = 24px.
  const horizontalPadding = 24;

  // Border: 1px on each side => total of 2px.
  const borderTotal = 2;

  // The gap between items in your flex container.
  const gap = 10;

  let lines = 1;            // Start with one line.
  let currentLineWidth = 0; // Running total of the current line width.

  skills.forEach((skill) => {
    // Measure the width of the text.
    const textWidth = context.measureText(skill).width;

    // Compute the total width of the item.
    const itemWidth = textWidth + horizontalPadding + borderTotal;

    // If the current line cannot accommodate the new item,
    // wrap to the next line.
    if (currentLineWidth + itemWidth > containerWidth) {
      lines++;
      // Reset current line width. Start with this item,
      // plus a gap after it (if additional items are added).
      currentLineWidth = itemWidth + gap;
    } else {
      // Otherwise, add the item width and a gap.
      currentLineWidth += itemWidth + gap;
    }
  });

  return lines;
}

module.exports = {
  generatePDF: async ({ isSandboxMode, ...resumeData }, apiKey) => {
    const html = generateResumeHTML(resumeData);
    const { selectedSkills } = resumeData;
    const skillLines = computeSkillLines(selectedSkills, 659);
    console.log(`Skills will take ${skillLines} lines`);

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
