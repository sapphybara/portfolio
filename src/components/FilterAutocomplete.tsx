import { toSentenceCase } from "@/utils/utils";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

interface FilterAutocompleteProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

const FilterAutocomplete = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: FilterAutocompleteProps) => {
  return (
    <Autocomplete
      disableCloseOnSelect
      multiple
      options={options}
      limitTags={2}
      value={value}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      sx={{
        width: { xs: "unset", sm: "25%" },
        "& .MuiAutocomplete-inputRoot": {
          maxWidth: "100%",
          flexWrap: "wrap",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          key={params.id}
          label={label}
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&.Mui-focused": {
                backgroundColor: "background.paper",
              },
            },
          }}
        />
      )}
      renderOption={(props, option, { selected }) => {
        const { ...optionProps } = props;
        return (
          <li key={option} {...optionProps}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {toSentenceCase(option)}
          </li>
        );
      }}
      getOptionLabel={(option) => toSentenceCase(option)}
    />
  );
};

export default FilterAutocomplete;
