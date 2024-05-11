import { Stack, Typography } from "@mui/material";
import ScoreKey from "./ScoreKey";

const TableHeader = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography component="h2" variant="h5">
        Credit Cards
      </Typography>
      <ScoreKey />
    </Stack>
  );
};

export default TableHeader;
