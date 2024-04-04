import { ArrowOutward, Code, DesignServices } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";

interface PortfolioCard {
  title: string;
  subheader: string;
  affiliation: string;
  description: string;
  techStack: { name: string; type: "code" | "design" }[];
  linkInfo: { to: string; target?: string; rel?: string };
}

const portfolioCards: PortfolioCard[] = [
  {
    title: "HySCAN",
    subheader: "Hydrogen Safety Codes & Standards Applicability Navigator",
    affiliation: "Pacific Northwest National Laboratory",
    description:
      "How do I as a developer support those who utilize hydrogen (H2) in identifying relevant codes and standards for their systems? How do we maintain up-to-date compliance? HySCAN, part of H2Tools, simplifies compliance with intuitive workflows. Developed with ReactJS and styled-components, it swiftly identifies areas of compliance and categorizes questions, empowering users with tailored solutions.",
    techStack: [
      { name: "ReactJS", type: "code" },
      { name: "styled-components", type: "code" },
      { name: "Figma", type: "design" },
    ],
    linkInfo: {
      to: "https://h2tools.org/hyscan",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    title: "Developer Portfolio",
    subheader: "Personal Showcase of Projects and Skills",
    affiliation: "Myself",
    description:
      "A developer portfolio showcasing my projects and skills. Built with React, Vite, TypeScript, Material-UI, and Tailwind CSS. Designed to present my work in an organized and visually appealing manner.",
    techStack: [
      { name: "React", type: "code" },
      { name: "Vite", type: "code" },
      { name: "TypeScript", type: "code" },
      { name: "Material-UI", type: "code" },
      { name: "Tailwind CSS", type: "code" },
    ],
    linkInfo: { to: "#Developer-Portfolio" },
  },
];

const Portfolio = () => {
  const renderPortfolioCard = ({
    title,
    subheader,
    affiliation,
    description,
    techStack,
    linkInfo,
  }: PortfolioCard) => (
    <Card className="mb-4 mx-4" key={title} id={title.replace(/\s/g, "-")}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h3", component: "h3" }}
        subheader={subheader}
        subheaderTypographyProps={{ variant: "h6", component: "h4" }}
      />
      <CardContent className="pt-0">
        {techStack.map(({ name, type }) => (
          <Typography key={name} variant="tag">
            {type === "code" ? (
              <Code color="secondary" />
            ) : (
              <DesignServices color="secondary" />
            )}
            {name}
          </Typography>
        ))}
        <Typography className="mt-4 mx-4" paragraph>
          {description}
        </Typography>
        <Stack alignItems="center" direction="row" component={CardActions}>
          <Typography className="mb-0" color="text.secondary" paragraph>
            Project on behalf of: {affiliation}
          </Typography>
          <HashLink
            className="!ml-auto flex items-center"
            color="secondary"
            {...linkInfo}
            scroll={(el) => {
              const y = el.getBoundingClientRect().top + window.scrollY - 66;
              window.scrollTo({ top: y, behavior: "smooth" });
            }}
            smooth
          >
            View Project
            {linkInfo.target === "_blank" && <ArrowOutward fontSize="small" />}
          </HashLink>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography className="decorated" variant="h1">
        Portfolio
      </Typography>
      {portfolioCards.map(renderPortfolioCard)}
    </Box>
  );
};

export default Portfolio;
