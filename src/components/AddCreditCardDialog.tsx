import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { generateClient } from "aws-amplify/api";
import { ChangeEvent, useState } from "react";
import { CreateCreditCardInput } from "src/API";
import { createCreditCard } from "src/graphql/mutations";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
  isCompleteCreditCard,
} from "src/utils/utils";

const client = generateClient();
const initialFormState: Partial<CreateCreditCardInput> = {
  isEarningInterest: false,
};

const AddCreditCardDialog = ({
  closeDialog,
  fetchCreditCards,
  open,
}: {
  closeDialog: () => void;
  fetchCreditCards: () => Promise<void>;
  open: boolean;
}) => {
  const [formState, setFormState] =
    useState<Partial<CreateCreditCardInput>>(initialFormState);

  async function addCreditCard() {
    try {
      if (!isCompleteCreditCard(formState)) {
        return;
      }

      const creditCard = { ...formState };
      setFormState(initialFormState);
      await client.graphql({
        query: createCreditCard,
        variables: {
          input: creditCard,
        },
      });
      closeDialog();
      fetchCreditCards();
    } catch (err) {
      console.log("error creating new credit card:", err);
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
    const label = toSentenceCase(key);

    if (key === "score") {
      return null;
    }

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
    <Dialog
      open={open}
      PaperProps={{ className: "w-3/5 min-w-64", component: "form" }}
    >
      <DialogTitle>Add Credit Card</DialogTitle>
      <DialogContent>{creditCardKeys.map(renderFormControl)}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          disabled={!isCompleteCreditCard(formState)}
          onClick={addCreditCard}
        >
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCreditCardDialog;
