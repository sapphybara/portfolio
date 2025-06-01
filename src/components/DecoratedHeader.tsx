import { Typography } from "@mui/material";
import { DecoratedHeaderProps } from "types/global";

const DecoratedHeader = ({
  decoration,
  header,
  level,
}: DecoratedHeaderProps) => (
  <span>
    <Typography data-h-level={level} variant="decoration">
      {decoration}
    </Typography>
    <Typography variant={`h${level}`}>{header}</Typography>
  </span>
);

export default DecoratedHeader;
