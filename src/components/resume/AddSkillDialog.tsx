import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  UseAutocompleteProps,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { FC, useState, useEffect, useRef } from "react";
import { AutoCompleteOption, SectionContent } from "types/global";
import CreatableAutocomplete from "./CreateableAutocomplete";

interface AddSkillDialogProps {
  availableSections: string[];
  dialogValue: AutoCompleteOption;
  setDialogValue: (value: AutoCompleteOption) => void;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  sectionContent: SectionContent;
}

type SectionAutocompleteProps = UseAutocompleteProps<
  string,
  false,
  false,
  true
>;
type SkillAutocompleteProps = UseAutocompleteProps<
  AutoCompleteOption,
  false,
  false,
  true
>;

const skillFilter = createFilterOptions<string>();
const sectionFilter = createFilterOptions<AutoCompleteOption>();

const AddSkillDialog: FC<AddSkillDialogProps> = ({
  availableSections,
  dialogValue,
  setDialogValue,
  handleClose,
  handleSubmit,
  open,
  sectionContent,
}) => {
  const [sectionInputValue, setSectionInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");
  const [availableSkills, setAvailableSkills] = useState<AutoCompleteOption[]>(
    []
  );

  const prevSectionRef = useRef<string>("");

  useEffect(() => {
    // update available skills when the section changes
    const sectionHasChanged = prevSectionRef.current !== dialogValue.section;

    if (dialogValue.section && sectionContent[dialogValue.section]) {
      if (sectionHasChanged) {
        setAvailableSkills(sectionContent[dialogValue.section].skills || []);
      }
    } else if (sectionHasChanged && availableSkills.length) {
      // If there's no valid section and skills are selected, clear the skills.
      setAvailableSkills([]);
    }

    // Update the ref with the current section for the next render.
    prevSectionRef.current = dialogValue.section;
  }, [availableSkills.length, dialogValue.section, sectionContent]);

  const handleSectionChange: SectionAutocompleteProps["onChange"] = (
    _event,
    newValue
  ) => {
    if (typeof newValue === "string") {
      // Handle "Add [section]" click
      const sectionName = newValue.match(/^Add\s+"(.*)"/)?.[1];
      if (sectionName) {
        setDialogValue({
          ...dialogValue,
          section: sectionName,
        });
        setSectionInputValue(sectionName);
      } else {
        // user just pressed enter
        setDialogValue({
          ...dialogValue,
          section: newValue,
        });
      }
    } else {
      // no option selected, clear the input
      setDialogValue({
        ...dialogValue,
        section: "",
      });
    }
  };

  const handleSkillChange: SkillAutocompleteProps["onChange"] = (
    _event,
    newValue
  ) => {
    if (typeof newValue === "string") {
      // Handle "Add [skill]" click
      const skillName = newValue.match(/^Add\s+"(.*)"/)?.[1];
      if (skillName) {
        setDialogValue({
          ...dialogValue,
          label: skillName,
        });
        setSkillInputValue(skillName);
      }
    } else if (newValue?.inputValue) {
      // user just pressed enter
      setDialogValue({
        ...dialogValue,
        label: newValue.inputValue,
      });
    } else {
      if (newValue) {
        // user selected an existing option
        setDialogValue(newValue);
      } else {
        // no option selected, clear the input
        setDialogValue({
          ...dialogValue,
          label: "",
        });
      }
    }
  };

  const handleSectionFilter: SectionAutocompleteProps["filterOptions"] = (
    options,
    params
  ) => {
    const filtered = skillFilter(options, params);
    const { inputValue } = params;

    // Suggest creating a new value when input doesn't exist
    const isExisting = options.some(
      (option) => inputValue.toLowerCase() === option.toLowerCase()
    );

    if (inputValue !== "" && !isExisting) {
      filtered.push(`Add "${inputValue}"`);
    }

    return filtered;
  };

  const handleSkillFilter: SkillAutocompleteProps["filterOptions"] = (
    options,
    params
  ) => {
    const filtered = sectionFilter(options, params);
    const { inputValue } = params;

    // Suggest creating a new value when input doesn't exist
    const isExisting = options.some(
      (option) => inputValue.toLowerCase() === option.label.toLowerCase()
    );

    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        label: `Add "${inputValue}"`,
        section: dialogValue.section,
        selected: true,
      });
    }

    return filtered;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new skill</DialogTitle>
        <DialogContent>
          <CreatableAutocomplete<string>
            filterOptions={handleSectionFilter}
            handleChange={handleSectionChange}
            inputValue={sectionInputValue}
            label="Section"
            options={availableSections}
            setInputValue={setSectionInputValue}
            shouldAutoFocusTextField
            value={dialogValue.section}
          />
          <CreatableAutocomplete<AutoCompleteOption>
            filterOptions={handleSkillFilter}
            handleChange={handleSkillChange}
            inputValue={skillInputValue}
            label="Skill"
            options={availableSkills}
            setInputValue={setSkillInputValue}
            value={dialogValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSkillDialog;
