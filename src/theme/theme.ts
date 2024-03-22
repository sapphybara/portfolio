import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      "Lato", // Specify Lato as the primary font
      "Arial", // Fallback font
      "sans-serif",
    ].join(","),
  },
});

export default theme;
