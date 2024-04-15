import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

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
import CreditCardTable from "src/components/CreditCardTable";

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
      setFormState(undefined);
      await client.graphql({
        query: createCreditCard,
        variables: {
          input: creditCard,
        },
      });
      fetchCreditCards();
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

  const renderFormControl = (key: keyof CreateCreditCardInput) => {
    const type = creditCardTypeMapping[key];
    const label = camelToSentenceCase(key);

    if (type === "boolean") {
      return (
        <FormControl key={key}>
          <FormControlLabel
            control={<Checkbox />}
            label={label}
            onChange={(e) =>
              setFormState({
                ...formState,
                [key]: (e?.target as HTMLInputElement).checked,
              })
            }
            required
          />
        </FormControl>
      );
    }

    if (type === "date") {
      return (
        <DatePicker
          format="DD"
          key={key}
          label={label}
          onChange={(value) =>
            setFormState({ ...formState, [key]: value?.format("YYYY-MM-DD") })
          }
          views={["day"]}
        />
      );
    }

    return (
      <FormControl key={key}>
        <InputLabel htmlFor={key}>{label}</InputLabel>
        <Input
          id={key}
          inputProps={{
            step: 0.01,
          }}
          onChange={handleFormChange}
          type={type}
          aria-describedby={`input for ${label}`}
        />
      </FormControl>
    );
  };

  return (
    <Box>
      <Typography variant="decoration">Manage</Typography>
      <Typography className="decorated" variant="h1">
        Admin
      </Typography>
      <Box className="flex flex-wrap" component="form">
        {creditCardKeys.map(renderFormControl)}
        <Button
          disabled={!isCompleteCreditCard(formState)}
          onClick={addCreditCard}
          variant="contained"
        >
          Add Credit Card
        </Button>
      </Box>
      <CreditCardTable creditCards={creditCards} />
    </Box>
  );
};

export default Admin;
