import { Stack, Tab, Tabs, Theme, useMediaQuery } from "@mui/material";
import { FC } from "react";
import PortfolioCard from "@components/PortfolioCard";
import portfolioCards from "@assets/json/portfolio_cards.json";
import { PortfolioItem, TabState } from "types/global";
import CustomTabPanel from "./CustomTabPanel";

const Portfolio: FC<TabState> = ({
  maxTabHeight,
  setMaxTabHeight,
  setTabIdx,
  tabIdx,
}) => {
  const isMdUp = useMediaQuery("(min-width: 730px)");
  const isSmDown = useMediaQuery((theme) =>
    (theme as Theme).breakpoints.down("sm")
  );

  const a11yProps = (idPrefix: string, index: number) => ({
    id: `${idPrefix}-tab-${index}`,
    "aria-controls": `${idPrefix}-tabpanel-${index}`,
  });

  return (
    <Stack component="section" direction={isMdUp ? "row" : "column"}>
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
          maxTabHeight={maxTabHeight}
          setMaxTabHeight={setMaxTabHeight}
          value={tabIdx}
        >
          <PortfolioCard {...(project as PortfolioItem)} />
        </CustomTabPanel>
      ))}
    </Stack>
  );
};

export default Portfolio;
