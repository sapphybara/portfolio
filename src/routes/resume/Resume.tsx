import {
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import CollapsibleCard from "@components/CollapsibleCard";
import "./resume.css";
import { SharedCardHeaderProps } from "types/global";
import {
  BusinessCenterOutlined,
  DeveloperBoardOutlined,
  LightbulbOutlined,
  ScienceOutlined,
  TerminalOutlined,
} from "@mui/icons-material";
import { ReactNode } from "react";

interface ResumeDataItem extends SharedCardHeaderProps {
  data: string[] | ResumeDataItem[];
  dataType: "list" | "paragraph";
  defaultIsOpen?: boolean;
  renderData?: (data: string | ReactNode) => ReactNode;
}

// Type guard function to check if an element is a ResumeDataItem
const isResumeDataItem = (item: unknown): item is ResumeDataItem =>
  typeof item === "object" &&
  item !== null &&
  "data" in item &&
  "dataType" in item &&
  Array.isArray(item.data) &&
  item.data.every(
    (dataItem: unknown) =>
      typeof dataItem === "string" || isResumeDataItem(dataItem)
  );

const resumeData: ResumeDataItem[] = [
  {
    title: "Skills",
    avatar: <TerminalOutlined fontSize="large" />,
    data: [
      "React",
      "JavaScript/ES6+",
      "TypeScript",
      "CSS3/HTML5",
      "SCSS/Bootstrap/Tailwind",
      "React Native",
      "Python",
      "Django Web Framework",
      "Plotly Dash Framework",
      "Pytest",
      "styled-components",
      "Git",
      "MySQL",
      "PostgreSQL",
      "GraphQL",
      "Technical Documentation",
      "Atlassian Suite",
      "SCRUM",
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Node.js",
      "WCAG 2.x",
      "AWS Amplify",
      "Jest",
      "Cypress",
    ],
    dataType: "list",
    defaultIsOpen: true,
  },
  {
    title: "Experience",
    avatar: <BusinessCenterOutlined fontSize="large" />,
    data: [
      {
        title: "Front End Developer",
        avatar: <DeveloperBoardOutlined fontSize="large" />,
        subheader:
          "Pacific Northwest National Laboratory | Mar 2021 - Dec 2023",
        data: [
          "As a Front End Developer at Pacific Northwest National Lab, I collaborated closely with cross-functional teams to develop interactive, data-driven visualization platforms for scientific collaboration. Utilizing my expertise in React, TypeScript, and Python, I contributed to the creation of cutting-edge solutions tailored to meet project requirements.",
          "I also took the lead in UI/UX design, implementing enhancements that proved instrumental in securing an additional $50k in funding. Under tight deadlines, I demonstrated my ability to thrive under pressure by implementing last-minute bug fixes and features, ensuring client satisfaction through reliable and informative demos.",
          "Furthermore, I played a key role in improving code quality, reducing technical debt, and mentoring junior staff members, fostering a collaborative and growth-oriented work environment.",
        ],
        dataType: "paragraph",
        titleTypographyProps: {
          component: "h3",
          variant: "h4",
        },
      },
      {
        title: "Web Development Intern",
        avatar: <LightbulbOutlined fontSize="large" />,
        subheader:
          "Pacific Northwest National Laboratory | May 2020 - Aug 2020",
        data: [
          "During my tenure as a Web Development Intern at Pacific Northwest National Lab in the summer of 2020, I gained valuable hands-on experience in frontend development. I was responsible for developing UI features in a React application and implementing efficient real-time charting using D3.js.",
          "This internship provided me with the opportunity to enhance my skills in React, Node.js, JavaScript, CSS3, and HTML5 while contributing to real-world projects in a professional environment.",
        ],
        dataType: "paragraph",
        titleTypographyProps: {
          component: "h3",
          variant: "h4",
        },
      },
      {
        title: "Undergrad Research Assistant",
        avatar: <ScienceOutlined fontSize="large" />,
        subheader:
          "UT Austin Nuclear Engineering Teaching Lab | July 2018 - Dec 2020",
        data: [
          "In my role as an Undergraduate Research Assistant at The University of Texas at Austin Nuclear Engineering Teaching Lab, I led software development projects focused on autonomous outdoor air samplers. Leveraging my knowledge of Python, Django, JavaScript, and HTML/CSS, I developed a local Django server for result processing.",
          "This experience allowed me to apply my technical skills to address real-world challenges and further develop my expertise in software development and project management.",
        ],
        dataType: "paragraph",
        titleTypographyProps: {
          component: "h3",
          variant: "h4",
        },
      },
    ],
    dataType: "list",
    defaultIsOpen: true,
  },
];

const Resume = () => {
  const renderResumeData = ({
    data,
    dataType,
    renderData = (...data) => <>{data}</>,
    title,
    titleTypographyProps = {
      component: "h2",
      variant: "h3",
    },
    ...cardProps
  }: ResumeDataItem) => {
    return (
      <CollapsibleCard
        key={title?.toString()}
        title={title}
        variant="outlined"
        titleTypographyProps={titleTypographyProps}
        {...cardProps}
      >
        <CardContent component={Stack} gap={2}>
          {data.every(isResumeDataItem) ? (
            data.map((d) => renderData(renderResumeData(d)))
          ) : dataType === "list" ? (
            <List
              className="p-0 list-disc grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
              component={Stack}
              flexWrap="wrap"
              gap={1}
            >
              {data.map((text) => (
                <ListItem className="list-item" key={text} disableGutters>
                  {renderData(text)}
                </ListItem>
              ))}
            </List>
          ) : dataType === "paragraph" ? (
            data.map((text) => (
              <Typography key={text} paragraph>
                {renderData(text)}
              </Typography>
            ))
          ) : null}
        </CardContent>
      </CollapsibleCard>
    );
  };

  return (
    <Box component="section">
      <Typography variant="decoration">View my</Typography>
      <Typography className="decorated" variant="h1">
        Resume
      </Typography>
      <Box className="flex flex-col gap-8 my-4">
        {resumeData.map(renderResumeData)}
      </Box>
    </Box>
  );
};
export default Resume;
