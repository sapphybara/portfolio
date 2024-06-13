import { Stack, Typography, styled } from "@mui/material";
import ScoreKey from "./ScoreKey";

const TableTitle = styled(Typography)(() => ({
  flex: "1 0 auto",
})) as typeof Typography;

const TableHeader = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <TableTitle component="h2" variant="h5">
        Credit Cards
      </TableTitle>
      <ScoreKey />
    </Stack>
  );
};

export default TableHeader;
