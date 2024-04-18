import { Box, Typography, Chip, Paper } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { PortfolioCard } from "types/global";

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioCard;

  return (
    <Paper className="p-4">
      <Typography variant="h3">{portfolioDetail.title}</Typography>
      <Typography variant="h4">{portfolioDetail.subheader}</Typography>
      <Typography variant="subtitle1">{portfolioDetail.affiliation}</Typography>
      <Typography variant="body1">{portfolioDetail.description}</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
        {portfolioDetail.techStack.map((tech, index) => (
          <Chip key={index} label={tech.name} variant="filled" />
        ))}
      </Box>
    </Paper>
  );
};

export default PortfolioDetail;
