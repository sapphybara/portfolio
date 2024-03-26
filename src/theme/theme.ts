import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "./LinkBehavior";

const createCustomTheme = (rootElement: Element) =>
  createTheme({
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
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            decoration: "p",
          },
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
      decoration: {
        textTransform: "uppercase",
      },
    },
  });

export default createCustomTheme;
