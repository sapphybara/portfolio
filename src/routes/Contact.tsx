import { Box, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Box component="section">
      <Typography variant="decoration">Get in</Typography>
      <Typography className="decorated" variant="h1">
        Contact
      </Typography>
      <Typography>You can reach me at &lt;places&gt;</Typography>
    </Box>
  );
};

export default Contact;
