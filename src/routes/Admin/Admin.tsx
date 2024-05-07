import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { generateClient } from "aws-amplify/api";

import CreditCardTable from "@components/CreditCardTable/CreditCardTable";
import AddCreditCardDialog from "@components/AddCreditCardDialog";
import { useFetchCreditCards } from "@hooks/hooks";
import { useFetcher } from "react-router-dom";

const client = generateClient();

const Admin = () => {
  const fetcher = useFetcher();
  const [isAddCreditCardDialogOpen, setIsAddCreditCardDialogOpen] =
    useState(false);
  const {
    creditCards,
    fetchCreditCards,
    error: ccError,
    loading: ccIsLoading,
  } = useFetchCreditCards(client);

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

  if (ccError) {
    return <Typography>Error fetching credit cards</Typography>;
  }

  return (
    <Box>
      <Typography variant="decoration">Manage</Typography>
      <Typography variant="h1">Admin</Typography>
      {ccIsLoading ? (
        <Typography paragraph>Loading...</Typography>
      ) : (
        <>
          <AddCreditCardDialog
            closeDialog={closeCreditCardDialog}
            fetchCreditCards={fetchCreditCards}
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
      )}
    </Box>
  );
};

export default Admin;
