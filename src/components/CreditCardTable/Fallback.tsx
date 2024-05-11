import { Skeleton } from "@mui/material";
import TableHeader from "./TableHeader";

const Fallback = () => (
  <>
    <TableHeader />
    <Skeleton height={400} variant="rounded" />
  </>
);

export default Fallback;
