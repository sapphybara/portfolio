import DecoratedHeader from "@/components/DecoratedHeader";
import { Box, Link, Stack } from "@mui/material";

const Admin = () => {
  return (
    <Box>
      <DecoratedHeader decoration="manage" header="Admin Dashboard" level={1} />
      <Stack>
        <Link href="/admin/credit-cards">Credit Cards</Link>
        <Link href="/admin/resume-builder">Resume Builder</Link>
      </Stack>
    </Box>
  );
};

export default Admin;
