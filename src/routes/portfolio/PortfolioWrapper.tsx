import { Grid, Stack, Typography } from "@mui/material";
import Portfolio from "@components/portfolio/Portfolio";
import DecoratedHeader from "@components/DecoratedHeader";

const PortfolioWrapper = () => {
  return (
    <Stack direction="column" gap={3} component="section">
      <DecoratedHeader decoration="View" header="My Projects" level={1} />
      <Grid container columns={2} spacing={2}>
        <Grid item xs={2} md={1} component={Typography}>
          This is a list of some of my favorite projects from over the years. It
          combines work completed during college, personal projects, and some of
          my freelance endeavors. My experience covers the full stack, starting
          at the backend with machine learning and creating RESTful APIs.
        </Grid>
        <Grid item xs={2} md={1} component={Typography}>
          Transiting to the frontend, I have worked extensively with TypeScript
          & modern frameworks to create custom-coded websites, as well as
          website builders in Content Management Systems. Beyond the development
          stack, I have designed multiple web applications using Adobe XD and,
          more recently, Figma.
        </Grid>
      </Grid>
      <Portfolio />
    </Stack>
  );
};

export default PortfolioWrapper;
