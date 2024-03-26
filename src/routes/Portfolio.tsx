import { Box, Link, Typography } from "@mui/material";

const Portfolio = () => {
  return (
    <Box component="section" className="mt-16 mx-8">
      <Typography variant="decoration">Check out my</Typography>
      <Typography variant="h1">Portfolio</Typography>
      <Box className="mt-12">
        <Typography variant="h2">Overview</Typography>
        <Typography paragraph>
          As a frontend developer and designer, I bring a versatile skill set
          that combines technical expertise with a keen eye for aesthetics and
          user experience.
        </Typography>
        <Typography paragraph>
          To view more about the individual skills and experience I have,&nbsp;
          <Link href="/resume">click here</Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default Portfolio;
