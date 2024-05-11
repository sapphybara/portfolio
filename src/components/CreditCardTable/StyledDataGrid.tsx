import { styled, type Theme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getBackgroundColor,
  getHoverBackgroundColor,
  getSelectedBackgroundColor,
  getSelectedHoverBackgroundColor,
} from "@utils/colors";
import { type CCLevelMapping, type CCScoreLevel } from "types/global";
import { levels, levelColors } from "./constants";

const generateLevelStyles = (
  level: CCScoreLevel,
  theme: Theme,
  levelColors: CCLevelMapping
) => {
  const color = theme.palette[levelColors[level].color].main;
  const { mode } = theme.palette;

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
    },
  };
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  ...levels.reduce(
    (acc, level) => ({
      ...acc,
      ...generateLevelStyles(level, theme, levelColors),
    }),
    {}
  ),
}));

export default StyledDataGrid;
