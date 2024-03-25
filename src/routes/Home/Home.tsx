import { Box, Typography } from "@mui/material";
import "./home.css";

const Home = () => {
  return (
    <section className="mt-8 mx-8 home">
      <Box className="header">
        <Typography>hi, my name is</Typography>
        <Typography variant="h1">Sapphyra</Typography>
      </Box>
      <Typography className="about mt-[6rem] ml-4">
        I'm Sapphyra, a passionate Front End Developer adept in React,
        JavaScript, TypeScript, and UI/UX design. My experience at Pacific
        Northwest National Lab included leading projects, enhancing UI/UX for
        increased funding, and ensuring accessibility. I thrive on
        problem-solving, mentorship, and bringing ideas to life through
        innovative digital experiences.
      </Typography>
    </section>
  );
};

export default Home;
