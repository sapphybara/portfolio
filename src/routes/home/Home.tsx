import { Box, Button, Stack, Typography, styled } from "@mui/material";
import ResumeLinkWithTooltip from "@components/ResumeLinkWithTooltip";

const TypographyStack = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  "& .MuiTypography-root": {
    lineHeight: "1.625",
    maxWidth: "48rem",
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

const LogoBackground = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    height: "250px",
    "&::before": {
      content: '""',
      position: "absolute",
      backgroundImage: `url(logo-${theme.palette.mode}-mode.png)`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      opacity: 0.35,
      height: "100%",
      width: "100%",
      zIndex: -1,
      [theme.breakpoints.down("sm")]: {
        backgroundPosition: "center",
      },
    },
  };
});

const Home = () => {
  return (
    <Box component="section">
      <LogoBackground>
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
        <Box className="flex flex-wrap">
          <Typography className="decorator grow w-full" variant="decoration">
            I am a
          </Typography>
          <Typography className="dev flex flex-wrap" variant="h2">
            Developer
            <Box className="mx-4" component="span" color="secondary.main">
              &
            </Box>
            Designer
          </Typography>
        </Box>
      </LogoBackground>
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
      <Stack className="mb-4" direction="row" flexWrap="wrap">
        <Button className="mr-4" href="/portfolio" variant="contained">
          Check out my work
        </Button>
        <ResumeLinkWithTooltip
          asLink={false}
          buttonText="View my resume"
          linkOrButtonProps={{ variant: "outlined" }}
        />
      </Stack>
    </Box>
  );
};

export default Home;
