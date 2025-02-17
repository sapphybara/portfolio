import { Box, Link, Stack, Typography } from "@mui/material";

const Admin = () => {
  return (
    <Box>
      <Typography variant="decoration">Manage</Typography>
      <Typography variant="h1">Admin</Typography>
      <Stack>
        <Link href="/admin/credit-cards">Credit Cards</Link>
        <Link href="/admin/resume-builder">Resume Builder</Link>
      </Stack>
    </Box>
  );
};

export default Admin;
