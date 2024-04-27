import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { useOutlet, useParams } from "react-router-dom";
import PortfolioCard from "@components/PortfolioCard";
import portfolioCards from "./portfolio_cards.json";
import { camelToSentenceCase } from "@utils/utils";

const Portfolio = () => {
  const outlet = useOutlet();
  const { projectId } = useParams<{ projectId?: string }>();

  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography variant="h1">Portfolio</Typography>
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/portfolio" underline="hover">
          Portfolio
        </Link>
        {projectId && (
          <Link
            aria-current="page"
            color="text.primary"
            href={`/portfolio/${projectId}`}
            underline="hover"
          >
            {camelToSentenceCase(projectId)}
          </Link>
        )}
      </Breadcrumbs>
      {outlet ?? (
        <>
          <Typography className="mb-2" component="h2" variant="h6">
            Click on a project to learn more.
          </Typography>
          {portfolioCards.map((card) => (
            <PortfolioCard key={card.id} {...card} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Portfolio;
