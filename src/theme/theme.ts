import { createTheme, responsiveFontSizes } from "@mui/material";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";
import type {} from "@mui/x-data-grid/themeAugmentation";
import LinkBehavior from "./LinkBehavior";

const createCustomTheme = (rootElement: Element) => {
  const createThemeFn =
    process.env.NODE_ENV === "production"
      ? createTheme
      : unstable_createMuiStrictModeTheme;
  const fontFamily = {
    header: "Merriweather Sans Variable, Georgia, serif",
    body: "Lato, Arial, sans-serif",
  };
  let theme = createThemeFn({
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
      MuiSvgIcon: {
        defaultProps: {
          color: "secondary",
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
    },
    palette: {
      contrastThreshold: 4.5,
      mode: "dark",
    },
    typography: {
      fontFamily: fontFamily.body,
    },
  });

  theme = createThemeFn(theme, {
    typography: {
      h1: {
        fontFamily: fontFamily.header,
      },
      h2: {
        fontFamily: fontFamily.header,
      },
      h3: {
        fontFamily: fontFamily.header,
      },
      h4: {
        fontFamily: fontFamily.header,
      },
      h5: {
        fontFamily: fontFamily.header,
      },
      h6: {
        fontFamily: fontFamily.header,
      },
      decoration: {
        textTransform: "uppercase",
        color: theme.palette.secondary.main,
        fontFamily: fontFamily.header,
        '& + [class^="MuiTypography"]': {
          marginTop: theme.spacing(-0.5),
        },
        ...[1, 2, 3, 4, 5, 6].reduce(
          (acc, val) => ({
            ...acc,
            [`& + .MuiTypography-h${val}`]: {
              marginTop: theme.spacing(-(0.08 * val + 0.8)),
            },
          }),
          {}
        ),
      },
      tag: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(1),
        fontSize: "0.8rem",
        fontFamily: fontFamily.body,
        backgroundColor: theme.palette.grey[800],
        borderRadius: theme.shape.borderRadius * 2,
        padding: `${theme.spacing(0.25)} ${theme.spacing(1)} ${theme.spacing(
          0.25
        )} ${theme.spacing(0.5)}`,
        margin: `0 ${theme.spacing(0.5)}`,
      },
    },
  });
  return responsiveFontSizes(theme);
};

export default createCustomTheme;
