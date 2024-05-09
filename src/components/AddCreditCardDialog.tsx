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
import { CreateCreditCardInput } from "src/API";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
} from "@utils/utils";
import { Form, useLocation, useNavigate } from "react-router-dom";

const AddCreditCardDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderFormControl = (key: keyof CreateCreditCardInput) => {
    const type = creditCardTypeMapping[key];
    const label = toSentenceCase(key);

    if (key === "score") {
      return null;
    }

    if (type === "boolean") {
      return (
        <FormControl key={key}>
          <FormControlLabel control={<Checkbox name={key} />} label={label} />
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
          name={key}
          type={type}
          aria-describedby={`input for ${label}`}
        />
      </FormControl>
    );
  };

  const closeDialog = () => {
    // they key seems to be default if the user came from a separate site; don't send them back there
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/admin");
    }
  };

  return (
    <Dialog
      open={true}
      PaperProps={{
        className: "w-3/5 min-w-64",
        component: Form,
        method: "post",
        replace: true,
      }}
    >
      <DialogTitle>Add Credit Card</DialogTitle>
      <DialogContent>{creditCardKeys.map(renderFormControl)}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit">Add Card</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCreditCardDialog;
