import { Autocomplete, TextField, UseAutocompleteProps } from "@mui/material";

type AutocompleteOptionsType<T> = UseAutocompleteProps<T, false, false, true>;

interface CreatableAutocompleteProps<T> {
  filterOptions: AutocompleteOptionsType<T>["filterOptions"];
  handleChange: AutocompleteOptionsType<T>["onChange"];
  inputValue: string;
  label: string;
  options: T[];
  setInputValue: (value: string) => void;
  shouldAutoFocusTextField?: boolean;
  value: T;
}

const CreatableAutocomplete = <T,>({
  filterOptions,
  handleChange,
  inputValue,
  label,
  options,
  setInputValue,
  shouldAutoFocusTextField = false,
  value,
}: CreatableAutocompleteProps<T>) => (
  <Autocomplete
    freeSolo
    inputValue={inputValue}
    onInputChange={(_event, newInputValue) => {
      setInputValue(newInputValue);
    }}
    value={value}
    onChange={handleChange}
    filterOptions={filterOptions}
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    options={options}
    renderInput={(params) => (
      <TextField
        {...params}
        autoFocus={shouldAutoFocusTextField}
        margin="dense"
        label={label}
        type="text"
        variant="standard"
      />
    )}
  />
);

export default CreatableAutocomplete;
