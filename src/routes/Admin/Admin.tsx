import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";

import { generateClient } from "aws-amplify/api";

import { listCreditCards } from "src/graphql/queries";
import { type CreateCreditCardInput, type CreditCard } from "src/API";
import {
  camelToSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
  isCompleteCreditCard,
} from "src/utils/utils";
import { createCreditCard } from "src/graphql/mutations";

const client = generateClient();

const Admin = () => {
  const [formState, setFormState] = useState<Partial<CreateCreditCardInput>>();
  const [creditCards, setCreditCards] = useState<
    CreditCard[] | CreateCreditCardInput[]
  >([]);

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

  async function addCreditCard() {
    try {
      if (!isCompleteCreditCard(formState)) return;

      const creditCard = { ...formState };
      await client.graphql({
        query: createCreditCard,
        variables: {
          input: creditCard,
        },
      });
      setCreditCards([...creditCards, creditCard]);
      setFormState(undefined);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <Box>
      <Typography variant="decoration">Manage</Typography>
      <Typography className="decorated" variant="h1">
        Admin
      </Typography>
      <Box className="flex flex-wrap" component="form">
        {creditCardKeys.map((key) => (
          <FormControl key={key}>
            <InputLabel htmlFor={key}>{camelToSentenceCase(key)}</InputLabel>
            <Input
              id={key}
              inputProps={{
                step: creditCardTypeMapping[key] === "date" ? 1 : 0.01,
              }}
              onChange={handleFormChange}
              type={
                creditCardTypeMapping[key] === "boolean"
                  ? "checkbox"
                  : creditCardTypeMapping[key]
              }
              aria-describedby={`input for ${camelToSentenceCase(key)}`}
            />
          </FormControl>
        ))}
        <Button
          disabled={!isCompleteCreditCard(formState)}
          onClick={addCreditCard}
          variant="contained"
        >
          Add Credit Card
        </Button>
      </Box>
      {creditCards.map((cc) => (
        <Box key={cc.id}>
          {creditCardKeys.map((key) => (
            <Typography key={key} paragraph>
              {camelToSentenceCase(key)}: {cc[key]}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Admin;
