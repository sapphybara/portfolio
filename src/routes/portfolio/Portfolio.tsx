import { Box, Typography, Breadcrumbs, Link, Stack } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useOutlet, useParams } from "react-router-dom";
import PortfolioCard from "@components/PortfolioCard";
import portfolioCards from "src/assets/portfolio_cards.json";
import { toSentenceCase } from "@utils/utils";
import { PortfolioItem } from "types/global";

const Portfolio = () => {
  const outlet = useOutlet();
  const { projectId } = useParams<{ projectId?: string }>();

  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography variant="h1">Portfolio</Typography>
      <Breadcrumbs
        aria-label="breadcrumb"
        className="mb-4"
        separator={<NavigateNext fontSize="small" />}
      >
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link
          color={projectId ? "inherit" : "text.primary"}
          href="/portfolio"
          underline="hover"
        >
          Portfolio
        </Link>
        {projectId && (
          <Link
            aria-current="page"
            color="text.primary"
            href={`/portfolio/${projectId}`}
            underline="hover"
          >
            {toSentenceCase(projectId)}
          </Link>
        )}
      </Breadcrumbs>
      {outlet ?? (
        <>
          <Typography className="mb-2" component="h2" variant="h6">
            Click on a project to learn more.
          </Typography>
          <Stack
            className="mb-4"
            direction={{ xs: "column", md: "row" }}
            gap={1}
          >
            {portfolioCards.map((card) => (
              <PortfolioCard key={card.id} {...(card as PortfolioItem)} />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Portfolio;
