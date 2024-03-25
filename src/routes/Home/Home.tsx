import { Box, Link, Typography } from "@mui/material";
import "./home.css";

const Home = () => {
  return (
    <section className="mt-[4rem] ml-8 home">
      <Box className="header flex flex-wrap">
        <Typography className="w-full" color="secondary.main">
          hi, my name is
        </Typography>
        <Box className="flex flex-wrap justify-between w-4/5">
          <Typography variant="h1">Sapphyra</Typography>
          <Box
            className="rounded-[50%]"
            sx={{ bgcolor: "text.secondary", height: "100px", width: "100px" }}
          >
            <img
              className="rounded-[50%]"
              src="src/assets/img.png"
              alt="Picture of Sapphyra Wiser"
              width="100px"
              height="100px"
            />
          </Box>
        </Box>
      </Box>
      <Box className="header group my-12">
        <Typography className="decorator" color="secondary.main">
          I am a
        </Typography>
        <Typography variant="h2">Developer</Typography>
        <Typography className="amp" color="secondary.main">
          &
        </Typography>
        <Typography className="design" variant="h2">
          Designer
        </Typography>
      </Box>
      <Typography className="about mt-16 mx-4">
        I build diverse front end and mobile applications, and my passion lies
        in accessibility, in every domain.&nbsp;
        <Link href="/portfolio">Check out my work</Link> or&nbsp;
        <Link href="/contact">get in touch</Link>!
      </Typography>
    </section>
  );
};

export default Home;
