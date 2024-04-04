import { ArrowOutward, Code, DesignServices } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

interface PortfolioCard {
  title: string;
  subheader: string;
  affiliation: string;
  description: string;
  techStack: { name: string; type: "code" | "design" }[];
  linkInfo: { href: string; target?: string; rel?: string };
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
      href: "https://h2tools.org/hyscan",
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
    linkInfo: { href: "#" },
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
    <Card className="mb-4 mx-4" key={title}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h3", component: "h3" }}
        subheader={subheader}
        subheaderTypographyProps={{ variant: "h4", component: "h4" }}
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
        <Stack alignItems="center" direction="row">
          <Typography className="mb-0" color="text.secondary" paragraph>
            Project on behalf of: {affiliation}
          </Typography>
          <Button
            className="ml-auto"
            color="secondary"
            endIcon={
              linkInfo.target === "_blank" && <ArrowOutward fontSize="small" />
            }
            variant="text"
            {...linkInfo}
          >
            View Project
          </Button>
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
