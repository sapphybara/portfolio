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
      tag: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(1),
        fontSize: "0.8rem",
        fontFamily: ["Lato", "Arial", "sans-serif"].join(","),
        backgroundColor: theme.palette.grey[800],
        borderRadius: theme.shape.borderRadius * 2,
        padding: `${theme.spacing(0.25)} ${theme.spacing(1)} ${theme.spacing(
          0.25
        )} ${theme.spacing(0.5)}`,
        margin: `0 ${theme.spacing(0.5)}`,
      },
    },
  });
};

export default createCustomTheme;
