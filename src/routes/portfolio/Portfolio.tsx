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
  Chip,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { PortfolioCard } from "types/global";
import portfolioCards from "./portfolio_cards.json";
import { useNavigate, useOutlet } from "react-router-dom";

const PortfolioWrapper = styled(Card)(({ theme }) => ({
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const Portfolio = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

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
    id,
    title,
    subheader,
    affiliation,
    techStack,
    linkInfo,
    shortDescription,
  }: PortfolioCard) => (
    <PortfolioWrapper
      className="mb-4 portfolio-card"
      key={title}
      id={title.replace(/\s/g, "-")}
      variant="outlined"
    >
      <CardActionArea onClick={() => navigate(`/portfolio/${id}`)}>
        <CardContent className="pt-0">
          <CardHeader
            title={title}
            titleTypographyProps={{ variant: "h3", component: "h3" }}
            subheader={subheader}
            subheaderTypographyProps={{ variant: "h6", component: "h4" }}
          />
          <Stack direction="row" gap={1}>
            {techStack.map(({ name, cardType }) => (
              <Chip key={name} label={name} icon={renderTagIcon(cardType)} />
            ))}
          </Stack>
          <Typography className="mt-4 mx-4" paragraph>
            {shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent className="pt-0">
        <Stack alignItems="center" direction="row" component={CardActions}>
          <Typography className="mb-0" color="text.secondary" paragraph>
            Project on behalf of: {affiliation}
          </Typography>
          <HashLink
            className="!ml-auto flex items-center gap-1"
            color="secondary"
            {...linkInfo}
            scroll={(el) => {
              const top = el.getBoundingClientRect().top + window.scrollY - 66;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            smooth
          >
            <Typography className="mb-0" paragraph>
              View Project
            </Typography>
            {linkInfo.target === "_blank" && <ArrowOutward fontSize="small" />}
          </HashLink>
        </Stack>
      </CardContent>
    </PortfolioWrapper>
  );

  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography variant="h1">Portfolio</Typography>
      {outlet ??
        portfolioCards.map((card) =>
          renderPortfolioCard(card as PortfolioCard)
        )}
    </Box>
  );
};

export default Portfolio;
