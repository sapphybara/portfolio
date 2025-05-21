import { useState } from "react";
import { Typography } from "@mui/material";
import Portfolio from "@components/portfolio/Portfolio";

const PortfolioWrapper = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <>
      <Typography id="portfolio" variant="decoration">
        View
      </Typography>
      <Typography color="text.primary" className="mb-4" variant="h3">
        My Projects
      </Typography>
      <Portfolio setTabIdx={setTabIdx} tabIdx={tabIdx} />
    </>
  );
};

export default PortfolioWrapper;
