import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { generateClient } from "aws-amplify/api";

import { listCreditCards } from "src/graphql/queries";
import { type CreateCreditCardInput, type CreditCard } from "src/API";
import CreditCardTable from "src/components/CreditCardTable";
import AddCreditCardDialog from "src/components/AddCreditCardDialog";

const client = generateClient();

const Admin = () => {
  const [creditCards, setCreditCards] = useState<
    CreditCard[] | CreateCreditCardInput[]
  >([]);
  const [isAddCreditCardDialogOpen, setIsAddCreditCardDialogOpen] =
    useState(false);

  useEffect(() => {
    fetchCreditCards();
  }, []);

  async function fetchCreditCards() {
    try {
      const ccData = await client.graphql({
        query: listCreditCards,
      });
      const cCs = ccData.data.listCreditCards.items;
      setCreditCards(cCs);
    } catch (err) {
      console.log("error fetching credit cards");
    }
  }

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
      <Typography className="decorated" variant="h1">
        Admin
      </Typography>
      <Box className="flex justify-between">
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
      <CreditCardTable creditCards={creditCards} />
    </Box>
  );
};

export default Admin;
