import { Circle } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import { levelColors, levels } from "./constants";

const ScoreKey = () => (
  <Stack className="p-2" direction="row" alignItems="center" spacing={1}>
    <Typography align="right" variant="subtitle1">
      Score Key:
    </Typography>
    {levels
      .sort((a, b) => b - a)
      .map((level) => (
        <Chip
          icon={<Circle color={levelColors[level].color} />}
          label={levelColors[level].label}
          key={level}
          size="small"
        />
      ))}
  </Stack>
);

export default ScoreKey;
