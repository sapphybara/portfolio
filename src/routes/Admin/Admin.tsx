import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import CreditCardTable from "@components/CreditCardTable/CreditCardTable";
import AddCreditCardDialog from "@components/AddCreditCardDialog";
import { useFetcher, useLoaderData } from "react-router-dom";
import { CreditCard } from "src/API";

const Admin = () => {
  const fetcher = useFetcher();
  const [isAddCreditCardDialogOpen, setIsAddCreditCardDialogOpen] =
    useState(false);
  const creditCards = useLoaderData() as CreditCard[];

  const changeAddCreditCardDialogOpen = (prevState?: boolean) => {
    if (prevState === undefined) {
      setIsAddCreditCardDialogOpen((prevState) => !prevState);
    } else {
      setIsAddCreditCardDialogOpen(prevState);
    }
  };

  const closeCreditCardDialog = () => {
    changeAddCreditCardDialogOpen(false);
  };

  return (
    <Box>
      <Typography variant="decoration">Manage</Typography>
      <Typography variant="h1">Admin</Typography>
      {
        <>
          <AddCreditCardDialog
            closeDialog={closeCreditCardDialog}
            open={isAddCreditCardDialogOpen}
          />
          <CreditCardTable
            creditCards={creditCards}
            toggleAddCreditCardDialogOpen={() =>
              changeAddCreditCardDialogOpen()
            }
          />
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
