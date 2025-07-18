import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";

interface CreditCardOwnerAutocompleteProps
  extends Omit<
    AutocompleteProps<string, false, false, false>,
    "options" | "renderInput"
  > {
  id: string;
}

const CreditCardOwnerAutocomplete = ({
  id,
  ...props
}: CreditCardOwnerAutocompleteProps) => (
  <Autocomplete
    autoSelect
    id={id}
    key={id}
    options={["Sapphy", "Heidi"]}
    renderInput={(params) => (
      <TextField {...params} label="Owner" name={id} required />
    )}
    {...props}
  />
);

export default CreditCardOwnerAutocomplete;
