import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Collapse,
  Divider,
  CardActionArea,
  CardProps,
  CardHeaderProps,
} from "@mui/material";
import {
  Accessibility,
  Assignment,
  DesignServices,
  DeveloperBoard,
  Dns,
  ExpandMore,
  Public,
  Storage,
  VerifiedUser,
} from "@mui/icons-material";
import { ReactNode, useState } from "react";
import "./resume.css";

const skillGroupings = [
  {
    theme: "Front End Development",
    skills: [
      "React",
      "Angular",
      "JavaScript/ES6+",
      "TypeScript",
      "CSS3/HTML5",
      "SCSS/Bootstrap/Tailwind",
      "React Native",
    ],
    icon: <DeveloperBoard />,
  },
  {
    theme: "Back End Development",
    skills: [
      "Python",
      "Django Web Framework",
      "Plotly Dash Framework",
      "Pytest",
    ],
    icon: <Storage />,
  },
  {
    theme: "Version Control and Database",
    skills: ["Git", "MySQL", "PostgreSQL"],
    icon: <Dns />,
  },
  {
    theme: "UI/UX Design and Prototyping",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    icon: <DesignServices />,
  },
  {
    theme: "Testing and Quality Assurance",
    skills: ["Jest", "Cypress"],
    icon: <VerifiedUser />,
  },
  {
    theme: "Documentation and Project Management",
    skills: [
      "Technical Documentation",
      "Atlassian Suite (Jira, Confluence)",
      "SCRUM",
    ],
    icon: <Assignment />,
  },
  {
    theme: "Web Technologies and Deployment",
    skills: ["Node.js", "AWS Amplify", "GraphQL"],
    icon: <Public />,
  },
  {
    theme: "Accessibility and Compliance",
    skills: ["WCAG 2.x"],
    icon: <Accessibility />,
  },
];

interface CollapsibleCardProps extends CardProps {
  collapseClassName?: string;
  headerIcon?: ReactNode;
  title: string;
  titleTypographyProps?: CardHeaderProps["titleTypographyProps"];
}

const CollapsibleCard: (props: CollapsibleCardProps) => ReactNode = ({
  children,
  className,
  collapseClassName,
  headerIcon,
  title,
  titleTypographyProps = { variant: "h3" },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className={className} raised>
      <CardActionArea
        className="flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardHeader
          avatar={headerIcon}
          title={title}
          titleTypographyProps={{ component: "h4", ...titleTypographyProps }}
        />
        <ExpandMore
          className={`rotate-${isOpen ? "180" : "0"} transition-transform`}
        />
      </CardActionArea>
      <Collapse className="ml-12" in={isOpen}>
        <Divider />
        <Box className={collapseClassName}>{children}</Box>
      </Collapse>
    </Card>
  );
};

const Resume = () => {
  return (
    <Box className="mt-16 mx-8" component="section">
      <Typography variant="decoration">View my</Typography>
      <Typography variant="h1">Resume</Typography>
      <CollapsibleCard
        className="collapse-parent pb-8 my-8"
        collapseClassName="collapse-content"
        title="Skills"
        titleTypographyProps={{ variant: "h2" }}
      >
        {skillGroupings.map(({ theme, skills, icon }) => (
          <CollapsibleCard
            className="max-w-sm"
            key={theme.replace(/\s+/g, "-")}
            headerIcon={icon}
            title={theme}
            titleTypographyProps={{
              variant: "h4",
            }}
          >
            <CardContent>
              <List>
                {skills.map((skill) => (
                  <ListItem disableGutters key={skill.replace(/\s+/g, "-")}>
                    {skill}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </CollapsibleCard>
        ))}
      </CollapsibleCard>
    </Box>
  );
};
export default Resume;
