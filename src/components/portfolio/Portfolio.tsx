import { Stack, Tab, Tabs, Theme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import PortfolioActions from "./PortfolioActions";
import portfolioCardsJSON from "@assets/json/portfolio_cards.json";
import { PortfolioItem } from "types/global";
import CustomTabPanel from "@components/CustomTabPanel";

const Portfolio = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [portfolioCards, setPortfolioCards] = useState(
    portfolioCardsJSON as PortfolioItem[]
  );

  const isMdUp = useMediaQuery("(min-width: 730px)");
  const isSmDown = useMediaQuery((theme) =>
    (theme as Theme).breakpoints.down("sm")
  );

  const a11yProps = (idPrefix: string, index: number) => ({
    id: `${idPrefix}-tab-${index}`,
    "aria-controls": `${idPrefix}-tabpanel-${index}`,
  });

  return (
    <>
      <PortfolioActions
        portfolioCardsJSON={portfolioCardsJSON as PortfolioItem[]}
        setPortfolioCards={setPortfolioCards}
      />
      <Stack direction={isMdUp ? "row" : "column"} py={1}>
        <Tabs
          aria-label="portfolio project selection"
          onChange={(_, value) => setTabIdx(value)}
          orientation={isMdUp ? "vertical" : "horizontal"}
          selectionFollowsFocus
          sx={{ ...(isMdUp && { flex: "1 0 25%" }) }}
          value={tabIdx}
          variant={isSmDown ? "scrollable" : !isMdUp ? "fullWidth" : "standard"}
        >
          {portfolioCards.map((project, index) => (
            <Tab
              label={project.title}
              key={project.id}
              {...a11yProps("project", index)}
            />
          ))}
        </Tabs>
        {portfolioCards.map((project, index) => (
          <CustomTabPanel
            idPrefix="project"
            index={index}
            key={project.id}
            value={tabIdx}
          >
            <PortfolioCard {...project} />
          </CustomTabPanel>
        ))}
      </Stack>
    </>
  );
};

export default Portfolio;
