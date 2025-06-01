import { Grid, Stack, Typography } from "@mui/material";
import DecoratedHeader from "@components/DecoratedHeader";
import PortfolioCard from "@components/portfolio/PortfolioCard";
import portfolioCards from "@assets/json/portfolio_cards.json";
import { PortfolioItem } from "types/global";
import HeaderWithButton from "./HeaderWithButton";
import ResumeLinkWithTooltip from "@/components/ResumeLinkWithTooltip";

const portfolioItemsToDisplay = (portfolioCards as PortfolioItem[]).filter(
  (item) => item.isFeaturedOnHome
);

const Home = () => {
  return (
    <Stack component="section" gap={2}>
      <DecoratedHeader
        decoration="hi, my name is"
        header="Sapphyra"
        level={1}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        gap={2}
      >
        <Typography>
          I craft digital experiences through full-stack development & UI design
          - merging code with creativity.
        </Typography>
        <ResumeLinkWithTooltip
          asLink={false}
          buttonText="Check out my resume"
          linkOrButtonProps={{
            className: "self-end flex-[1_0_auto] max-w-[max-content]",
            variant: "contained",
          }}
        />
      </Stack>
      <br />
      <HeaderWithButton
        btnTitle="See All Projects"
        href="/portfolio"
        headerData={{
          decoration: "featured",
          header: "Projects",
          level: 2,
        }}
      />
      <Grid container spacing={2} alignItems="stretch">
        {portfolioItemsToDisplay.map((item) => (
          <Grid key={item.id} item xs={12} md={6}>
            <PortfolioCard {...item} />
          </Grid>
        ))}
      </Grid>
      <br />
      <HeaderWithButton
        headerData={{
          decoration: "let's",
          header: "Connect",
          level: 2,
        }}
        btnTitle="Contact Me"
        href="/contact"
      />
      <Typography>
        I’m currently looking for opportunities in freelance or full-time roles.
        Reach out if you'd like to chat!
      </Typography>
      <br />
    </Stack>
  );
};

export default Home;
