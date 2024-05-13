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
      transition: "transform 0.3s, padding 0.3s",
      "&:hover": {
        transform: "scale(1.08)",
        padding: "0 0.2rem",
      },
    },
  },
}));

const Home = () => {
  const ProfilePicture = styled("img")((props) => ({
    backgroundColor: props.theme.palette.text.secondary,
    borderRadius: "50%",
    width: "100px",
    height: "100px",
  }));

  return (
    <Box component="section">
      <Box className="header flex flex-wrap">
        <Box className="flex flex-wrap justify-between w-11/12">
          <Box>
            <Typography variant="decoration">hi, my name is</Typography>
            <Typography variant="h1">Sapphyra</Typography>
          </Box>
          <ProfilePicture
            src="src/assets/img.png"
            alt="Picture of Sapphyra Wiser"
          />
        </Box>
      </Box>
      <Box>
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
      <TypographyStack gap={2}>
        <Typography>
          Welcome to my corner of the digital world! I'm a dedicated Front End
          Developer and Designer based in Denver, CO, with a passion for
          creating&nbsp;
          <Box className="highlight" component="span">
            fluid
          </Box>
          &nbsp;and intuitive digital experiences. My journey into the world of
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
