import { Box, Typography, Breadcrumbs, Link, Grid } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useOutlet, useParams } from "react-router-dom";
import PortfolioCard from "@components/PortfolioCard";
import portfolioCards from "@assets/json/portfolio_cards.json";
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
          <Grid className="mb-4" container spacing={1}>
            {portfolioCards.map((card) => (
              <Grid
                container
                item
                justifyContent="space-between"
                key={card.id}
                xs={6}
              >
                <PortfolioCard {...(card as PortfolioItem)} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Portfolio;
