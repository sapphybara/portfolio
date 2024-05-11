import { Box, Button, Typography } from "@mui/material";
import { Outlet, useFetcher, useLoaderData } from "react-router-dom";

import CreditCardTable from "@components/CreditCardTable/CreditCardTable";
import { CreditCard } from "@/API";

const Admin = () => {
  const fetcher = useFetcher();
  const creditCards = useLoaderData() as CreditCard[];

  return (
    <Box>
      <Outlet />
      <Typography variant="decoration">Manage</Typography>
      <Typography variant="h1">Admin</Typography>
      {
        <>
          <CreditCardTable creditCards={creditCards} />
          <fetcher.Form method="post" action="/logout">
            <Button
              className="my-2"
              color="warning"
              type="submit"
              variant="contained"
            >
              Sign Out
            </Button>
          </fetcher.Form>
        </>
      }
    </Box>
  );
};

export default Admin;
