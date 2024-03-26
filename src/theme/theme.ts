import { createTheme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "./LinkBehavior";

const createCustomTheme = (rootElement: Element) => {
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
      contrastThreshold: 4.5,
      mode: "dark",
    },
    typography: {
      fontFamily: ["Lato", "Arial", "sans-serif"].join(","),
    },
  });

  return createTheme(theme, {
    typography: {
      decoration: {
        textTransform: "uppercase",
        color: theme.palette.secondary.main,
      },
    },
  });
};

export default createCustomTheme;
