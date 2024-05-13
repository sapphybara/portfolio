import { Box, Button, Stack, Typography, styled } from "@mui/material";
import ResumeLinkWithTooltip from "@components/ResumeLinkWithTooltip";

const ExtraHeightTypography = styled(Typography)(() => ({
  lineHeight: "1.625",
  maxWidth: "48rem",
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
      <ExtraHeightTypography className="mt-8 mb-4" paragraph>
        I am a dedicated Front End Developer and Designer based in Denver, CO,
        with a passion for creating seamless and intuitive digital experiences.
        My journey into the world of technology started with a fascination for
        problem-solving, which led me to pursue a degree in Mathematics, with a
        Certificate in Computer Science, from the University of Texas at Austin.
      </ExtraHeightTypography>
      <ExtraHeightTypography paragraph>
        My professional journey has been marked by hands-on experience in
        ideating, designing, and building interactive and user-centric
        applications. I specialize in crafting pixel-perfect interfaces that not
        only look visually appealing but also prioritize accessibility and
        usability. This commitment to adhering to W3C standards ensures that
        every user, regardless of ability, can navigate and interact with
        digital products seamlessly.
      </ExtraHeightTypography>
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
