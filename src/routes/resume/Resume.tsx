import { Box, Typography, CardContent, List, ListItem } from "@mui/material";
import {
  Accessibility,
  Assignment,
  DesignServices,
  DeveloperBoard,
  Dns,
  Public,
  Storage,
  VerifiedUser,
} from "@mui/icons-material";
import CollapsibleCard from "@components/CollapsibleCard";
import "./resume.css";
import { ReactNode } from "react";

interface ResumeDataItem {
  data: string[];
  dataType: "list" | "paragraph";
  title: string;
  subheader?: string;
  icon?: ReactNode;
}

const resumeData: { [section: string]: ResumeDataItem[] } = {
  Skills: [
    {
      title: "Front End Development",
      data: [
        "React",
        "Angular",
        "JavaScript/ES6+",
        "TypeScript",
        "CSS3/HTML5",
        "SCSS/Bootstrap/Tailwind",
        "React Native",
      ],
      dataType: "list",
      icon: <DeveloperBoard />,
    },
    {
      title: "Back End Development",
      data: [
        "Python",
        "Django Web Framework",
        "Plotly Dash Framework",
        "Pytest",
      ],
      dataType: "list",
      icon: <Storage />,
    },
    {
      title: "Version Control and Database",
      data: ["Git", "MySQL", "PostgreSQL"],
      dataType: "list",
      icon: <Dns />,
    },
    {
      title: "UI/UX Design and Prototyping",
      data: ["UI/UX Design", "Figma", "Adobe XD"],
      dataType: "list",
      icon: <DesignServices />,
    },
    {
      title: "Testing and Quality Assurance",
      data: ["Jest", "Cypress"],
      dataType: "list",
      icon: <VerifiedUser />,
    },
    {
      title: "Documentation and Project Management",
      data: [
        "Technical Documentation",
        "Atlassian Suite (Jira, Confluence)",
        "SCRUM",
      ],
      dataType: "list",
      icon: <Assignment />,
    },
    {
      title: "Web Technologies and Deployment",
      data: ["Node.js", "AWS Amplify", "GraphQL"],
      dataType: "list",
      icon: <Public />,
    },
    {
      title: "Accessibility and Compliance",
      data: ["WCAG 2.x"],
      dataType: "list",
      icon: <Accessibility />,
    },
  ],
  Experience: [
    {
      title: "Front End Developer",
      subheader: "Pacific Northwest National Laboratory | Mar 2021 - Dec 2023",
      data: [
        "As a Front End Developer at Pacific Northwest National Lab, I collaborated closely with cross-functional teams to develop interactive, data-driven visualization platforms for scientific collaboration. Utilizing my expertise in React, TypeScript, and Python, I contributed to the creation of cutting-edge solutions tailored to meet project requirements.",
        "I also took the lead in UI/UX design, implementing enhancements that proved instrumental in securing an additional $50k in funding. Under tight deadlines, I demonstrated my ability to thrive under pressure by implementing last-minute bug fixes and features, ensuring client satisfaction through reliable and informative demos.",
        "Furthermore, I played a key role in improving code quality, reducing technical debt, and mentoring junior staff members, fostering a collaborative and growth-oriented work environment.",
      ],
      dataType: "paragraph",
    },
    {
      title: "Web Development Intern",
      subheader: "Pacific Northwest National Laboratory | May 2020 - Aug 2020",
      data: [
        "During my tenure as a Web Development Intern at Pacific Northwest National Lab in the summer of 2020, I gained valuable hands-on experience in frontend development. I was responsible for developing UI features in a React application and implementing efficient real-time charting using D3.js.",
        "This internship provided me with the opportunity to enhance my skills in React, Node.js, JavaScript, CSS3, and HTML5 while contributing to real-world projects in a professional environment.",
      ],
      dataType: "paragraph",
    },
    {
      title: "Undergrad Research Assistant",
      subheader:
        "UT Austin Nuclear Engineering Teaching Lab | July 2018 - Dec 2020",
      data: [
        "In my role as an Undergraduate Research Assistant at The University of Texas at Austin Nuclear Engineering Teaching Lab, I led software development projects focused on autonomous outdoor air samplers. Leveraging my knowledge of Python, Django, JavaScript, and HTML/CSS, I developed a local Django server for result processing.",
        "This experience allowed me to apply my technical skills to address real-world challenges and further develop my expertise in software development and project management.",
      ],
      dataType: "paragraph",
    },
  ],
};

const Resume = () => {
  return (
    <Box component="section">
      <Typography variant="decoration">View my</Typography>
      <Typography className="decorated" variant="h1">
        Resume
      </Typography>
      <Box className="flex flex-col gap-8 my-4">
        {Object.entries(resumeData).map(([sectionName, sectionData]) => (
          <CollapsibleCard
            className={"collapse-parent"}
            collapseClassName="collapse-content"
            defaultIsOpen
            key={sectionName}
            title={sectionName}
            titleTypographyProps={{
              className: "ml-8",
              component: "h2",
              variant: "h2",
            }}
          >
            {sectionData.map(({ title, subheader, data, dataType, icon }) => (
              <CollapsibleCard
                className="resume-section"
                key={title}
                avatar={icon}
                subheader={subheader}
                title={title}
                titleTypographyProps={{
                  component: "h3",
                  variant: "h4",
                }}
              >
                <CardContent>
                  {dataType === "list" && (
                    <List>
                      {data.map((text) => (
                        <ListItem key={text} disableGutters>
                          {text}
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {dataType === "paragraph" &&
                    data.map((text) => (
                      <Typography key={text} paragraph>
                        {text}
                      </Typography>
                    ))}
                </CardContent>
              </CollapsibleCard>
            ))}
          </CollapsibleCard>
        ))}
      </Box>
    </Box>
  );
};
export default Resume;
