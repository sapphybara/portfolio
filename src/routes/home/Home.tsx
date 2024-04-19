import { Box, Button, Tooltip, Typography, styled } from "@mui/material";
import "./home.css";

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
      <Box className="header grid">
        <Typography className="decorator grow w-full" variant="decoration">
          I am a
        </Typography>
        <Typography className="dev" variant="h2">
          Developer
        </Typography>
        <Typography className="amp" color="secondary.main">
          &
        </Typography>
        <Typography className="design" variant="h2">
          Designer
        </Typography>
      </Box>
      <Typography className="about mt-16 mb-8" paragraph>
        I build diverse front end and mobile applications, and my passion lies
        in accessibility, in every domain.
      </Typography>
      <Button className="mr-4" href="/portfolio" variant="contained">
        Check out my work
      </Button>
      <Tooltip title="Don't worry, this won't download a pesky file!">
        <Button href="/resume" variant="outlined">
          View my resume
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Home;
