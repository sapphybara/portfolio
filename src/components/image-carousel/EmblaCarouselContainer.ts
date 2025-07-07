import { styled } from "@mui/material";

export default styled("div")(({ theme }) => {
  const isDarkMode = theme.palette.mode === "dark";

  return {
    ".embla__viewport": {
      overflow: "hidden",
    },
    ".embla__container": {
      display: "flex",
      width: "100%",
    },
    ".embla__slide": {
      "--embla-slide-width": "98%",
      flex: "0 0 var(--embla-slide-width)",
      minWidth: 0,
      marginRight: "2%",
      position: "relative",
    },
    ".embla__slide img": {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
    },
    ".embla__dots": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      margin: 0,
      flex: 1,
    },
    ".embla__dot": {
      "--embla_dot": "12px",
      width: "var(--embla_dot)",
      height: "var(--embla_dot)",
      borderRadius: "calc(var(--embla_dot) / 2)",
      backgroundColor: isDarkMode
        ? theme.palette.grey[700]
        : theme.palette.grey[400],
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.grey[500],
      },
      "&.embla__dot--selected": {
        backgroundColor: isDarkMode
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      },
    },
    ".embla__fullscreen": {
      position: "absolute",
      top: 0,
      right: 0,
      "&:hover": {
        backgroundColor: isDarkMode
          ? theme.palette.grey[600]
          : theme.palette.grey[400],
      },
    },
  };
});
