import {
  ArrowOutward,
  BugReportOutlined,
  BuildOutlined,
  CodeOutlined,
  DesignServicesOutlined,
  DesktopWindowsOutlined,
  ExtensionOutlined,
  StorageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";

interface PortfolioCard {
  title: string;
  subheader: string;
  affiliation: string;
  description: string;
  techStack: {
    name: string;
    type:
      | "frontend"
      | "backend"
      | "fullstack"
      | "design"
      | "testing"
      | "tooling"
      | "other";
  }[];
  linkInfo: { to: string; target?: string; rel?: string };
}

const portfolioCards: PortfolioCard[] = [
  {
    title: "HySCAN",
    subheader: "Hydrogen Safety Codes & Standards Applicability Navigator",
    affiliation: "Pacific Northwest National Laboratory",
    description:
      "As a developer, I supported users in navigating hydrogen (H2) codes and standards, ensuring compliance and safety in their systems. HySCAN, a vital component of the H2Tools suite, facilitated this process with intuitive workflows. It efficiently identified and categorized areas of adherence, empowering users with tailored solutions for enhanced safety and efficiency.",
    techStack: [
      { name: "React", type: "frontend" },
      { name: "styled-components", type: "frontend" },
      { name: "Figma", type: "design" },
      { name: "Node", type: "backend" },
      { name: "Jest", type: "testing" },
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
      { name: "React", type: "frontend" },
      { name: "Vite", type: "tooling" },
      { name: "TypeScript", type: "frontend" },
      { name: "Material-UI", type: "design" },
      { name: "Tailwind CSS", type: "frontend" },
    ],
    linkInfo: { to: "#Developer-Portfolio" },
  },
];

const PortfolioWrapper = styled(Card)(({ theme }) => ({
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const Portfolio = () => {
  const renderTagIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <DesktopWindowsOutlined color="secondary" fontSize="small" />;
      case "backend":
        return <StorageOutlined color="secondary" fontSize="small" />;
      case "fullstack":
        return <CodeOutlined color="secondary" fontSize="small" />;
      case "design":
        return <DesignServicesOutlined color="secondary" fontSize="small" />;
      case "testing":
        return <BugReportOutlined color="secondary" fontSize="small" />;
      case "tooling":
        return <BuildOutlined color="secondary" fontSize="small" />;
      default:
        return <ExtensionOutlined color="secondary" fontSize="small" />;
    }
  };

  const renderPortfolioCard = ({
    title,
    subheader,
    affiliation,
    description,
    techStack,
    linkInfo,
  }: PortfolioCard) => (
    <PortfolioWrapper
      className="mb-4 mx-4 portfolio-card"
      key={title}
      id={title.replace(/\s/g, "-")}
      variant="outlined"
    >
      <CardActionArea className="cursor-default">
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "h3", component: "h3" }}
          subheader={subheader}
          subheaderTypographyProps={{ variant: "h6", component: "h4" }}
        />
        <CardContent className="pt-0">
          {techStack.map(({ name, type }) => (
            <Typography key={name} variant="tag" paragraph>
              {renderTagIcon(type)}
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
              className="!ml-auto flex items-center gap-1"
              color="secondary"
              {...linkInfo}
              scroll={(el) => {
                const top =
                  el.getBoundingClientRect().top + window.scrollY - 66;
                window.scrollTo({ top, behavior: "smooth" });
              }}
              smooth
            >
              <Typography className="mb-0" paragraph>
                View Project
              </Typography>
              {linkInfo.target === "_blank" && (
                <ArrowOutward fontSize="small" />
              )}
            </HashLink>
          </Stack>
        </CardContent>
      </CardActionArea>
    </PortfolioWrapper>
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
