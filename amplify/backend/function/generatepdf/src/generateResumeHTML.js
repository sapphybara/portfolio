/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const marked = require("marked").marked;

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (link) => {
  const html = linkRenderer.call(renderer, link);
  return html.replace(/^<a /, '<a target="_blank" ');
};

const getCommonCSS = () => `
  :root {
    --primary-color: #aa00aa;
  }
  body {
    font-family: "Lato", sans-serif;
    margin: auto;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
  }
  h1, h2, h3 {
    font-family: "Merriweather Sans", sans-serif;
    color: var(--primary-color);
  }
  .job-title {
    text-align: center;
    font-style: italic;
  }
  .contact, .contact a {
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
    padding: 6px 8px;
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
  .job-header, .header {
    font-weight: bold;
    font-size: 16px;
    color: var(--primary-color);
    margin: 0;
  }
  .job-details, .details {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
  ul {
    padding-left: 20px;
    margin-block: 10px;
  }
  ul:not(.skills) li {
    margin-top: -16px;
  }
  h2 {
    margin-block: 0.5em;
  }
`

const getDynamicCSS = (skillLines) => {
  switch (skillLines) {
    case 2:
      return `
        h1 {
          margin-block: 4px;
        }
        .job-title {
          margin-block: 0;
        }
        hr {
          margin-bottom: 10px;
        }
        h2:not(.education) {
          margin-block: 0.25em;
        }
      `;
    case 3:
      return `
        h2:not(.education) {
          padding: 8px 0;
        }
        ul.skills {
          padding: 10px 0;
        }
        .job-details {
          padding: 6px 0 10px;
        }
        hr {
          margin-block: 40px;
        }
        .contact {
          line-height: 2.5;
        }
        li {
          margin-top: 0px;
        }
        .skills li {
          padding: 10px 8px;
          margin-bottom: 16px;
        }
      `;
    case 4:
      return `
        h2:not(.education) {
          padding: 6px 0;
        }
        ul.skills {
          padding: 10px 0;
        }
        .job-details {
          padding: 6px 0 10px;
        }
        hr {
          margin-block: 38px;
        }
        .contact {
          line-height: 2;
        }
        .skills li {
          padding: 8px;
          margin-bottom: 6px;
        }
      `;
    case 5:
      return `
        h2:not(.education) {
          padding: 6px 0;
        }
        ul.skills {
          padding: 10px 0;
        }
        .job-details {
          padding: 6px;
        }
        hr {
          margin-block: 20px;
        }
        .skills li {
          padding: 8px;
          margin-bottom: 6px;
        }
      `;
    case 1:
    default:
      return "";
  }
}

const generateHTMLHead = (jobTitle, css) => `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sapphyra Wiser - ${jobTitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Merriweather+Sans:wght@700&display=swap" rel="stylesheet" />
    <style>
      ${css}
    </style>
  </head>
`;

const generateContactInfo = (jobTitle) => `
  <h1 style="text-align: center; margin-top: 0">Sapphyra Wiser</h1>
  <h3 class="job-title">${jobTitle}</h3>
  <hr />
  <p class="contact">🏠 Denver, CO | 📧
  <a href="mailto:sapphyra.wiser@gmail.com" target="_blank">sapphyra.wiser@gmail.com</a>
    | 📞 (720) 839-7618 <br /> 🔗
  <a href="https://linkedin.com/in/sapphyra-wiser" target="_blank">LinkedIn</a> | 🌐
  <a href="https://sapphyrawiser.com" target="_blank">sapphyrawiser.com</a>
  </p>
`;

const generateSkills = (selectedSkills) =>
  selectedSkills.length
    ? `
        <h2>Skills</h2>
        <ul class="skills">
          ${selectedSkills.map((skill) => `<li>${skill}</li>`).join("")}
        </ul>
      `
    : ""
  ;

const generateExperience = (experience) => `
  <h2>Experience</h2>
  ${experience
    .map(
      (exp) => `
        <h3 class="job-header">${exp.title}</h3>
        <p class="job-details">${exp.subheader}</p>
        <ul>
          ${exp.data
          .map((detail) => `<li>${marked(detail, { renderer })}</li>`)
          .join("")}
        </ul>
      `
    )
    .join("")
  }
`;

const generateEducation = (education) => `
  <h2 class="education">Education</h2>
  ${education
    .map(
      (edu) => `
        <h3 class="header">${edu.title}</h3>
        <p class="details">${edu.subheader}</p>
      `
    )
    .join("")
  }
`;

module.exports = ({ jobTitle, selectedSkills, experience, education, skillLines }) => {
  const css = getCommonCSS() + getDynamicCSS(skillLines);

  return `
    <html lang="en">
      <body>
        ${generateHTMLHead(jobTitle, css).trim()}
        ${generateContactInfo(jobTitle).trim()}
        ${generateSkills(selectedSkills).trim()}
        ${generateExperience(experience).trim()}
        ${generateEducation(education).trim()}
      </body>
    </html>
  `;
};
