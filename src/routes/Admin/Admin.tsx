import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { generateClient } from "aws-amplify/api";

import CreditCardTable from "@components/CreditCardTable";
import AddCreditCardDialog from "@components/AddCreditCardDialog";
import { useFetchCreditCards } from "@hooks/hooks";
import { useAuth } from "@hooks/useAuth";
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
  const {
    error: _userError,
    isLoading: userIsLoading,
    user,
    signIn,
    signOut,
  } = useAuth();

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
      {userIsLoading ? (
        <Typography paragraph>Loading...</Typography>
      ) : !user ? (
        <SignIn signIn={signIn} />
      ) : (
        <>
          <Box className="flex justify-between my-2">
            <Typography component="h2" variant="h5">
              Credit Cards
            </Typography>
            <Button
              onClick={() => changeAddCreditCardDialogOpen()}
              variant="contained"
            >
              Add Credit Card
            </Button>
            <AddCreditCardDialog
              closeDialog={closeCreditCardDialog}
              fetchCreditCards={fetchCreditCards}
              open={isAddCreditCardDialogOpen}
            />
          </Box>
          <CreditCardTable creditCards={creditCards} loading={ccIsLoading} />
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
