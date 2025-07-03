import { Stack, Typography } from "@mui/material";
import Portfolio from "@components/portfolio/Portfolio";
import DecoratedHeader from "@components/DecoratedHeader";

const PortfolioWrapper = () => {
  return (
    <Stack direction="column" gap={3} component="section">
      <DecoratedHeader decoration="View" header="My Projects" level={1} />
      <Typography>
        Here's a curated selection of my recent work spanning front-end
        development, fullstack builds, UI/UX design, and technical strategy.
      </Typography>
      <Typography>
        Each project reflects my commitment to building accessible, user-first
        solutions with clean code and thoughtful design. Whether it's a
        freelance client, a personal challenge, or a team effort — these
        projects demonstrate how I turn ideas into polished digital experiences.
      </Typography>
      <Portfolio />
    </Stack>
  );
};

export default PortfolioWrapper;
