import { Box, Typography, styled } from "@mui/material";

const HeaderGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  marginTop: theme.spacing(0.96),
  width: "fit-content",
  gridTemplate: '"dec1 . dec2" "dev amp design" / 1fr',
  "@media (max-width: 450px)": {
    gridTemplate: '"dec1 ." "dev amp" "dec2 ." "design ." / 1fr',
  },
  "& #amp": {
    marginTop: theme.spacing(-0.96),
  },
}));

const AboutHeader = () => {
  return (
    <HeaderGrid>
      <Typography gridArea="dec1" variant="decoration">
        I am a Front-end
      </Typography>
      <Typography gridArea="dev" variant="h2">
        Developer
      </Typography>
      <Typography
        className="mx-4"
        color="secondary.main"
        id="amp"
        gridArea="amp"
        variant="h2"
      >
        &
      </Typography>
      <Typography gridArea="dec2" variant="decoration">
        UI/UX
      </Typography>
      <Typography gridArea="design" variant="h2">
        Designer
      </Typography>
    </HeaderGrid>
  );
};

export default AboutHeader;
