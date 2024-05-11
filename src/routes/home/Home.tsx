import { Box, Button, Stack, Typography, styled } from "@mui/material";
import ResumeLinkWithTooltip from "@components/ResumeLinkWithTooltip";

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
      <Typography className="leading-relaxed mt-8 mb-4" paragraph>
        I build diverse front end and mobile applications, and my passion lies
        in accessibility, in every domain.
      </Typography>
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
