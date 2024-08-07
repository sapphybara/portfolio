import { Form, useActionData } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  TextField,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CreateCreditCardInput } from "@/API";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
} from "@utils/utils";
import { LoaderActionError } from "types/global";
import CreditCardOwnerAutocomplete from "./CreditCardOwnerAutocomplete";

const NoPaddingDialogTitle = styled(DialogTitle)(({ theme }) => ({
  "&+.MuiDialogContent-root.form-inputs": {
    paddingTop: theme.spacing(1),
  },
}));

const DialogContentStack = styled(DialogContent)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(1.25),
  justifyContent: "center",
  "& > .MuiFormControl-root, & > .MuiAutocomplete-root": {
    width: `calc(50% - ${theme.spacing(0.625)})`,
  },
  "& > .MuiTypography-root": {
    width: "100%",
  },
}));

const AddCreditCardDialog = () => {
  const actionData = useActionData() as LoaderActionError | undefined;

  const renderFormControl = (key: keyof CreateCreditCardInput) => {
    const type = creditCardTypeMapping[key];
    const label = toSentenceCase(key);

    if (key === "score") {
      return null;
    }

    if (key === "owner") {
      return <CreditCardOwnerAutocomplete id={key} key={key} />;
    }

    if (type === "boolean") {
      return (
        <FormControl key={key}>
          <FormControlLabel
            control={<Checkbox name={key} />}
            label="Earning Interest?"
          />
        </FormControl>
      );
    }

    if (type === "date") {
      return (
        <DatePicker
          format="YYYY-MM-DD"
          key={key}
          label={label}
          name={key}
          slotProps={{
            textField: {
              required: true,
            },
          }}
          views={["day"]}
        />
      );
    }

    const isRequired = !["apr", "lastInterestAmount"].includes(key);

    return (
      <TextField
        autoFocus={key === "cardName"}
        defaultValue={!isRequired ? "0" : undefined}
        id={key}
        inputProps={{ "aria-describedby": `input for ${label}`, step: "0.01" }}
        key={key}
        label={label}
        name={key}
        required={isRequired}
        type={type}
      />
    );
  };

  return (
    <Dialog
      open={true}
      PaperProps={{
        className: "min-w-64",
        component: Form,
        method: "post",
      }}
    >
      <NoPaddingDialogTitle>Add Credit Card</NoPaddingDialogTitle>
      <DialogContentStack className="form-inputs">
        {actionData && actionData.status === "error" && (
          <Alert severity="warning">{actionData.message}</Alert>
        )}
        {creditCardKeys.map(renderFormControl)}
      </DialogContentStack>
      <DialogActions>
        <Button href="/admin">Cancel</Button>
        <Button type="submit">Add Card</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCreditCardDialog;
