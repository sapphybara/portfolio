import { styled, type Theme } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import {
  getBackgroundColor,
  getHoverBackgroundColor,
  getSelectedBackgroundColor,
  getSelectedHoverBackgroundColor,
} from "@utils/colors";
import {
  CCLevelConsumerProps,
  type CCLevelMapping,
  type CCScoreLevel,
} from "types/global";

const generateLevelStyles = (
  level: CCScoreLevel,
  theme: Theme,
  levelColors: CCLevelMapping
) => {
  const color = theme.palette[levelColors[level]].main;
  const { mode } = theme.palette;
  const content = level === 3 ? "⚠️" : level === 4 ? "❌" : undefined;

  return {
    [`& .level-${level} .score`]: {
      backgroundColor: getBackgroundColor(color, mode),
      "&:hover": {
        backgroundColor: getHoverBackgroundColor(color, mode),
      },
      "&.Mui-selected": {
        backgroundColor: getSelectedBackgroundColor(color, mode),
        "&:hover": {
          backgroundColor: getSelectedHoverBackgroundColor(color, mode),
        },
      },
      ...(content && {
        "&::before": {
          content: `"${content}"`,
          position: "absolute",
          left: theme.spacing(0.5),
        },
      }),
    },
  };
};

const StyledDataGrid = styled((props: DataGridProps & CCLevelConsumerProps) => (
  <DataGrid {...props} />
))(({ theme, levelColors, levels }) => ({
  ...levels.reduce(
    (acc, level) => ({
      ...acc,
      ...generateLevelStyles(level, theme, levelColors),
    }),
    {}
  ),
}));

export default StyledDataGrid;
