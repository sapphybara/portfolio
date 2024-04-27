import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { generateClient } from "aws-amplify/api";

import CreditCardTable from "@components/CreditCardTable/CreditCardTable";
import AddCreditCardDialog from "@components/AddCreditCardDialog";
import { useFetchCreditCards } from "@hooks/hooks";
import { useAuth } from "@hooks/hooks";
import SignIn from "src/components/SignIn";

const client = generateClient();

const Admin = () => {
  const [isAddCreditCardDialogOpen, setIsAddCreditCardDialogOpen] =
    useState(false);
  const {
    creditCards,
    fetchCreditCards,
    error: ccError,
    loading: ccIsLoading,
  } = useFetchCreditCards(client);
  const { isLoading: userIsLoading, user, signOut } = useAuth();

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
      {userIsLoading || ccIsLoading ? (
        <Typography paragraph>Loading...</Typography>
      ) : !user ? (
        <SignIn />
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
          <Button
            className="my-2"
            color="warning"
            onClick={signOut}
            variant="contained"
          >
            Sign Out
          </Button>
        </>
      )}
    </Box>
  );
};

export default Admin;
