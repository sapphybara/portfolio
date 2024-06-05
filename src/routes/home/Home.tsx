import { Box, Divider, Link, Stack, Typography, styled } from "@mui/material";
import ResumeLinkWithTooltip from "@components/ResumeLinkWithTooltip";
import AboutHeader from "@components/AboutHeader";
import Portfolio from "@components/Portfolio";
import { FC } from "react";
import { TabState } from "types/global";

const TypographyStack = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& .MuiTypography-root": {
    lineHeight: "1.625",
    "& .highlight": {
      display: "inline-block",
      fontWeight: "bold",
      color: theme.palette.secondary.main,
      paddingRight: "0.2rem",
      transition: "transform 0.3s, padding 0.3s",
      "&:hover": {
        transform: "scale(1.08)",
        padding: "0 0.3rem 0 0.2rem",
      },
    },
  },
}));

const Home: FC<TabState> = (props) => {
  return (
    <Stack component="section">
      <Stack justifyContent="space-around">
        <Stack
          className="max-w-[52rem]"
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="decoration">hi, my name is</Typography>
            <Typography variant="h1">Sapphyra</Typography>
          </Box>
        </Stack>
        <AboutHeader />
      </Stack>
      <TypographyStack gap={2}>
        <Typography>
          Welcome to my corner of the digital world! I'm a dedicated Front End
          Developer and Designer based in Denver, CO, with a passion for
          creating&nbsp;
          <Box className="highlight" component="span">
            fluid
          </Box>
          and intuitive digital experiences. My journey into the world of
          technology started with a fascination for problem-solving, which led
          me to pursue a degree in Mathematics, with a Certificate in Computer
          Science, from the University of Texas at Austin.
        </Typography>
        <Typography>
          My professional journey has been marked by hands-on experience in
          ideating, designing, and building interactive and user-centric
          applications. I specialize in crafting pixel-perfect interfaces that
          not only look visually appealing but also prioritize accessibility and
          usability. This commitment to adhering to W3C standards ensures that
          every user, regardless of ability, can navigate and interact with
          digital products&nbsp;
          <Box className="highlight" component="span">
            seamlessly.
          </Box>
        </Typography>
      </TypographyStack>
      <Divider />
      <ResumeLinkWithTooltip
        asLink={false}
        buttonText="Check out my resume"
        linkOrButtonProps={{
          className: "self-end",
          variant: "contained",
        }}
      />
      <Typography id="portfolio" variant="decoration">
        View
      </Typography>
      <Typography
        color="text.primary"
        className="mb-4"
        component={Link}
        href="#portfolio"
        underline="none"
        variant="h3"
      >
        My Projects
      </Typography>
      <Portfolio {...props} />
    </Stack>
  );
};

export default Home;
