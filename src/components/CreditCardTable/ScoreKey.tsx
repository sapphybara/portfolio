import { Circle } from "@mui/icons-material";
import { Chip, Stack, Typography, styled } from "@mui/material";
import { levelColors, levels } from "./constants";

const ChipStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  width: "fit-content",
  [theme.breakpoints.down(500)]: {
    flexDirection: "column",
  },
}));

const ScoreKey = () => (
  <Stack className="p-2" direction="row" alignItems="flex-end" spacing={1}>
    <Typography align="right" variant="subtitle1">
      Score Key:
    </Typography>
    <ChipStack direction="row" spacing={0.5}>
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
    </ChipStack>
  </Stack>
);

export default ScoreKey;
