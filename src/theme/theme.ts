import {
  LinkProps,
  PaletteMode,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import LinkBehavior from "./LinkBehavior";

const createCustomTheme = (rootElement: Element, mode: PaletteMode) => {
  const createThemeFn =
    process.env.NODE_ENV === "production"
      ? createTheme
      : unstable_createMuiStrictModeTheme;
  const fontFamily = {
    header: "Merriweather Sans Variable, Georgia, serif",
    body: "Lato, Arial, sans-serif",
  };
  const isDarkMode = mode === "dark";

  const paletteColors = {
    primary: {
      main: isDarkMode ? "#dda0dd" : "#008080 ",
    },
    secondary: {
      main: isDarkMode ? "#60e1e0" : "#AA00AA",
    },
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
          color: "primary",
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiCard: {
        defaultProps: {
          raised: !isDarkMode,
          variant: isDarkMode ? "outlined" : "elevation",
        },
      },
    },
    palette: {
      contrastThreshold: 4.5,
      mode,
      ...paletteColors,
    },
    typography: {
      fontFamily: fontFamily.body,
    },
  });

  theme = createThemeFn(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          ::selection {
            background-color: ${theme.palette.secondary.main};
            color: ${theme.palette.secondary.contrastText};
          }
        `,
      },
    },
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
