import { Stack, Tab, Tabs, Theme, useMediaQuery } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import PortfolioCard from "./PortfolioCard";
import PortfolioActions from "./PortfolioActions";
import portfolioCardsJSON from "@assets/json/portfolio_cards.json";
import { PortfolioItem } from "types/global";
import CustomTabPanel from "@components/CustomTabPanel";

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [portfolioCards, setPortfolioCards] = useState(
    portfolioCardsJSON as PortfolioItem[]
  );

  const isMdUp = useMediaQuery("(min-width: 730px)");
  const isSmDown = useMediaQuery((theme) =>
    (theme as Theme).breakpoints.down("sm")
  );

  const selectedProject = searchParams.get("selectedProject");

  // Find the index of the selected project
  const tabIdx = selectedProject
    ? portfolioCards.findIndex((project) => project.id === selectedProject)
    : -1;

  // Handle invalid or missing selectedProject parameter
  useEffect(() => {
    if (!selectedProject || tabIdx === -1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("selectedProject", portfolioCards[0].id);
      setSearchParams(newParams, { replace: true });
    }
  }, [selectedProject, tabIdx, searchParams, setSearchParams, portfolioCards]);

  // If we're in an invalid state, show nothing while redirecting
  if (!selectedProject || tabIdx === -1) {
    return null;
  }

  const activeTabIdx = tabIdx;

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("selectedProject", portfolioCards[newValue].id);
    setSearchParams(newParams);
  };

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
          onChange={handleTabChange}
          orientation={isMdUp ? "vertical" : "horizontal"}
          selectionFollowsFocus
          sx={{ ...(isMdUp && { flex: "1 0 25%" }) }}
          value={activeTabIdx}
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
            value={activeTabIdx}
          >
            <PortfolioCard {...project} />
          </CustomTabPanel>
        ))}
      </Stack>
    </>
  );
};

export default Portfolio;
