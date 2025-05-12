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
  h1 {
    text-align: center;
    margin-top: 0;
    font-size: 2em;
  }
  .summary {
    text-align: center;
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
    case 1:
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
    case 2:
      return `
        h2:not(.education) {
          padding: 6px 0;
        }
        .job-details {
          padding: 6px 0;
        }
        hr {
          margin-block: 20px;
        }
      `;
    case 4:
      return `
        .job-title {
          margin-top: -15px;
          margin-bottom: 10px;
        }
        hr {
          margin-block: 0;
        }
      `;
    case 3:
    case 5:
      return `
        h2:not(.education) {
          padding: 6px 0;
        }
        ul.skills {
          padding: 12px 0;
        }
        .job-details {
          padding: 6px 0 10px;
        }
        hr {
          margin-block: 38px;
        }
        .contact {
          line-height: 2.25;
        }
        .skills li {
          padding: 10px 8px;
          margin-bottom: 6px;
        }
        .summary {
          margin: 30px 0;
          line-height: 2;
        }
      `;
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
  <h1>Sapphyra Wiser</h1>
  <h3 class="job-title">${jobTitle}</h3>
  <hr />
  <p class="contact">🏠 Denver, CO | 📧
  <a href="mailto:sapphyra.wiser@gmail.com" target="_blank">sapphyra.wiser@gmail.com</a>
    | 📞 (720) 839-7618 <br /> 🔗
  <a href="https://linkedin.com/in/sapphyra-wiser" target="_blank">linkedin.com/in/sapphyra-wiser</a> | 🌐
  <a href="https://sapphyrawiser.com" target="_blank">sapphyrawiser.com</a>
  </p>
`;

const generateSummary = (jobTitle) => `
  <p class="summary">Creative and driven ${jobTitle} with a strong foundation in both design and development, and a passion for both. Thrives in collaborative environments - and on the volleyball court.</p>
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

const formatYM = (date) => {
  const [year, month] = date.split("-");
  const jsDate = new Date(year, month - 1);
  if (isNaN(jsDate.getTime())) {
    return date;
  }
  return jsDate.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

const renderExperienceOrEducationDates = (expOrEdu, shouldUseTitleForPNNLRole, jobTitle) => {
  const { subheader, dateRange: { start, end }, id } = expOrEdu;
  const title = id === "pnnl" && shouldUseTitleForPNNLRole ? jobTitle : expOrEdu.title;
  const clsPrefix = id.startsWith("education") ? "" : "job-";
  const formattedStart = formatYM(start);
  const formattedEnd = end ? formatYM(end) : "Present";

  return `
    <h3 class="${clsPrefix}header">${title}</h3>
    <p class="${clsPrefix}details">${subheader} | <time datetime=${start}>${formattedStart}</time> - <time datetime=${end}>${formattedEnd}</time></p>
  `
}

const generateExperience = (experience, shouldUseTitleForPNNLRole, jobTitle) => `
  <h2>Experience</h2>
  ${experience
    .map(
      (exp) => `
        ${renderExperienceOrEducationDates(exp, shouldUseTitleForPNNLRole, jobTitle)}
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
  .map(renderExperienceOrEducationDates)
    .join("")
  }
`;

module.exports = ({ jobTitle, selectedSkills, experience, education, skillLines, shouldUseTitleForPNNLRole }) => {
  const css = getCommonCSS() + getDynamicCSS(skillLines);

  return `
    <html lang="en">
      ${generateHTMLHead(jobTitle, css).trim()}
      <body>
        <section id="contact">
          ${generateContactInfo(jobTitle).trim()}
        </section>
        <section id="summary">
          ${generateSummary(jobTitle).trim()}
        </section>
        <section id="skills">${generateSkills(selectedSkills).trim()}</section>
        <section id="experience">${generateExperience(experience, shouldUseTitleForPNNLRole, jobTitle).trim()}</section>
        <section id="education">${generateEducation(education).trim()}</section>
      </body>
    </html>
  `;
};
