import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lato", // Specify Lato as the primary font
      "Arial", // Fallback font
      "sans-serif",
    ].join(","),
  },
});

export default theme;
