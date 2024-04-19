import { Box, Typography } from "@mui/material";
import { useOutlet } from "react-router-dom";
import PortfolioCard from "@components/PortfolioCard";
import portfolioCards from "./portfolio_cards.json";

const Portfolio = () => {
  const outlet = useOutlet();

  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography variant="h1">Portfolio</Typography>
      {outlet ??
        portfolioCards.map((card) => <PortfolioCard key={card.id} {...card} />)}
    </Box>
  );
};

export default Portfolio;
