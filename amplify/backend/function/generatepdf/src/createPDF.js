// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const marked = require("marked").marked;
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { Buffer } = require('buffer');

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (link) => {
  const html = linkRenderer.call(renderer, link);
  return html.replace(/^<a /, '<a target="_blank" ');
};

const generateResumeHTML = ({
  jobTitle,
  selectedSkills,
  experience,
  education,
}) =>
  `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sapphyra Wiser - ${jobTitle}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Merriweather+Sans:wght@700&display=swap"
        rel="stylesheet"
      />
      <style>
        :root {
          --primary-color: #aa00aa;
        }
        body {
          font-family: "Lato", sans-serif;
          max-width: 800px;
          margin: auto;
          padding: 20px;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
        }
        h1,
        h2,
        h3 {
          font-family: "Merriweather Sans", sans-serif;
          color: var(--primary-color);
        }
        .contact,
        .contact a {
          text-align: center;
          font-size: 14px;
          color: #555;
        }
        a, .contact a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: bold;
        }
        ul.skills {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skills li {
          background: #fafafa;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          color: #333;
          border: 1px solid var(--primary-color);
        }
        hr {
          border: var(--primary-color);
          background-color: var(--primary-color);
          height: 3px;
          margin-bottom: 20px;
        }
        .job {
          margin-bottom: 15px;
        }
        .job-title {
          font-weight: bold;
          font-size: 16px;
          color: var(--primary-color);
          margin: 0;
        }
        .job-details {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        ul {
          padding-left: 20px;
          margin-block: 10px;
        }
        h2 {
          margin-block: 0.5em;
        }
      </style>
    </head>
    <body>

      <h1 style="text-align: center; margin-top: 0">Sapphyra Wiser</h1>
      <h3 style="text-align: center">${jobTitle}</h3>
      <hr />

      <p class="contact">🏠 Denver, CO | 📧
      <a href="mailto:sapphyra.wiser@gmail.com" target="_blank">sapphyra.wiser@gmail.com</a>
        | 📞 (720) 839-7618 <br /> 🔗
      <a href="https://linkedin.com/in/sapphyra-wiser" target="_blank">LinkedIn</a> | 🌐
      <a href="https://sapphyrawiser.com" target="_blank">sapphyrawiser.com</a>
      </p>

      ${selectedSkills.length
    ? `
          <h2>Skills</h2>
          <ul class="skills">
            ${selectedSkills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        `
    : null
      }

      <h2>Experience</h2>
      ${experience
    .map(
      (exp) => `
            <h3 class="job-title">${exp.title}</h3>
            <p class="job-details">${exp.subheader}</p>
            <ul>
              ${(exp.data)
          .map((detail) => `<li>${marked(detail, { renderer })}</li>`)
          .join("")}
            </ul>
          `
    )
    .join("")}

      <h2>Education</h2>
      ${education
    .map(
      (edu) => `
            <h3 class="job-title">${edu.title}</h3>
            <p class="job-details">${edu.subheader}</p>
          `
    )
    .join("")}
    </body>
  </html>
`;

module.exports = {
  generatePDF: async (data, apiKey) => {
    const html = generateResumeHTML(data);

    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: html,
        sandbox: process.env.ENV !== "main",
        margin: { top: "40px" },
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    return Buffer.from(await response.arrayBuffer());
  }
};
