import { FC, FormEvent, Fragment, useState } from "react";
import {
  Autocomplete,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AutoCompleteOption } from "types/global";

interface ResumeBuilderOption {
  autoCompleteOptions: AutoCompleteOption[];
  handleSkillChange: (skill: AutoCompleteOption) => void;
}

const filter = createFilterOptions<AutoCompleteOption>();

const emptyValue = { section: "", label: "", selected: false };

const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const SkillSelector: FC<ResumeBuilderOption> = ({
  autoCompleteOptions,
  handleSkillChange,
}) => {
  const [value, setValue] = useState<AutoCompleteOption | null>(null);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] =
    useState<AutoCompleteOption>(emptyValue);

  const handleClose = () => {
    setDialogValue(emptyValue);
    setValue(null);
    toggleOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const capitalizedValue = {
      ...dialogValue,
      section: capitalizeWords(dialogValue.section),
      label: capitalizeWords(dialogValue.label),
      selected: true,
    };
    setValue(capitalizedValue);
    handleSkillChange(capitalizedValue);
    handleClose();
  };

  const handleDialogOpen = (dialogValue: AutoCompleteOption) => {
    toggleOpen(true);
    setDialogValue({ ...dialogValue });
  };

  const prepareValue = (skillString: string, shouldTimeout?: boolean) => {
    // Match either "section/skill" or just "skill"
    const match = skillString.match(/^(?:([^/]+)\/)?(.+)$/);
    if (!match) return;

    setValue(emptyValue);

    const section = capitalizeWords(match[1]?.trim() || "Other Skills");
    const skill = capitalizeWords(match[2].trim());

    let newDialogValue = autoCompleteOptions.find(
      (s) => s.label.toLowerCase() === skill.toLowerCase()
    );

    if (newDialogValue) {
      // ignore the user's section if the skill already exists
      return handleSkillChange(newDialogValue);
    }
    newDialogValue = { label: skill, section, selected: true };
    if (shouldTimeout) {
      setTimeout(() => handleDialogOpen(newDialogValue));
    } else {
      handleDialogOpen(newDialogValue);
    }
  };

  return (
    <Fragment>
      {/* final `true` indicates we're in freeSolo mode, allowing `newValue?.inputValue?` */}
      <Autocomplete<AutoCompleteOption, false, false, true>
        value={value}
        onChange={(_event, newValue) => {
          if (typeof newValue === "string") {
            // user pressed enter in the text field
            prepareValue(newValue, true);
          } else if (newValue?.inputValue) {
            // user clicked the "add skill" button
            prepareValue(newValue.inputValue.replace(/^Add\s+"(.*)"$/, "$1"));
          } else {
            // user selected an existing option or null
            if (newValue) {
              handleSkillChange(newValue);
            }
            setValue(null);
          }
        }}
        groupBy={(option) => option.section}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              label: `Add "${params.inputValue}"`,
              section: "Other Skills",
              selected: true,
            });
          }

          return filtered;
        }}
        options={autoCompleteOptions}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search Skills" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new skill</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.section}
              onChange={(event) => {
                const { value: section } = event.target;
                setDialogValue({
                  ...dialogValue,
                  section,
                });
              }}
              label="section"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.label}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  label: event.target.value,
                })
              }
              label="skill"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default SkillSelector;
