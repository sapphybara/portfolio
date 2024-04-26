import { Circle } from "@mui/icons-material";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { CCLevelConsumerProps } from "types/global";

const ScoreKey = ({ levels, levelColors }: CCLevelConsumerProps) => (
  <Paper className="mb-2 p-2">
    <Typography component="h3" variant="h6" className="mb-4">
      Score Key
    </Typography>
    <Stack direction="row" spacing={1}>
      {levels.map((level) => (
        <Chip
          icon={<Circle color={levelColors[level]} />}
          label={levelColors[level]}
          key={level}
        />
      ))}
    </Stack>
  </Paper>
);

export default ScoreKey;
