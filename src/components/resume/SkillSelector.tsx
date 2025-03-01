import { FC, FormEvent, useState, useRef } from "react";
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  Typography,
  Box,
  Chip,
  UseAutocompleteProps,
  AutocompleteProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AutoCompleteOption, SectionContent } from "types/global";
import AddSkillDialog from "./AddSkillDialog";

// Styled components
const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 10px",
  position: "sticky",
  top: "-8px",
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  cursor: "pointer",
  transition: "background-color 0.2s",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
  },
}));

const SectionTitle = styled(Typography)({
  fontWeight: "bold",
  flexGrow: 1,
});

const SkillsList = styled("ul")({
  padding: 0,
});

interface ResumeBuilderOption {
  autoCompleteOptions: AutoCompleteOption[];
  getSectionSelectionStatus: (section: string) => boolean;
  handleSkillChange: (skill: AutoCompleteOption) => void;
  handleSectionSelection: (section: string) => void;
  sectionContent: SectionContent;
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
  getSectionSelectionStatus,
  handleSkillChange,
  handleSectionSelection,
  sectionContent,
}) => {
  const [value, setValue] = useState<AutoCompleteOption | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] =
    useState<AutoCompleteOption>(emptyValue);
  // Add a ref to the Autocomplete component
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Get unique sections from options
  const uniqueSections = Array.from(
    new Set(autoCompleteOptions.map((option) => option.section))
  );

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

  const prepareOpenDialog = (skillString: string, shouldTimeout?: boolean) => {
    // Match either "section/skill" or just "skill"
    const match = skillString.match(/^(?:([^/]+)\/)?(.+)$/);
    if (!match) return;

    setValue(emptyValue);
    setInputValue("");

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

  const handleAutocompleteChange: UseAutocompleteProps<
    AutoCompleteOption,
    false,
    false,
    true
  >["onChange"] = (_event, newValue) => {
    if (typeof newValue === "string") {
      // user pressed enter in the text field
      prepareOpenDialog(newValue, true);
    } else if (newValue?.inputValue) {
      // user clicked the "add skill" button
      prepareOpenDialog(newValue.inputValue);
    } else {
      // user selected an existing option or null
      if (newValue) {
        handleSkillChange(newValue);
      }
      setValue(null);
      setInputValue("");
    }

    // Ensure the autocomplete dropdown is dismissed
    const input = autocompleteRef.current?.querySelector("input");
    if (input) {
      setTimeout(() => input.blur());
    }
  };

  const renderAutocompleteGroup: AutocompleteProps<
    AutoCompleteOption,
    false,
    false,
    true,
    "div"
  >["renderGroup"] = (params) => (
    <li key={params.key}>
      <SectionHeader onClick={() => setInputValue(`${params.group}/`)}>
        <SectionTitle>Section: {params.group}</SectionTitle>
        <Chip
          label={`${
            getSectionSelectionStatus(params.group) ? "De-" : ""
          }Select All`}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionSelection(params.group);
          }}
        />
      </SectionHeader>
      <SkillsList>{params.children}</SkillsList>
    </li>
  );

  const handleAutocompleteFilter: UseAutocompleteProps<
    AutoCompleteOption,
    false,
    false,
    true
  >["filterOptions"] = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;

    // Check if input matches a section name
    const matchingSections = uniqueSections.filter((section) =>
      section.toLowerCase().includes(inputValue.toLowerCase().replace("/", ""))
    );

    // If input matches a section name, include all skills from that section
    if (inputValue && matchingSections.length > 0) {
      matchingSections.forEach((section) => {
        // Find all skills in this section that aren't already in the filtered list
        const sectionSkills = options.filter(
          (option) =>
            option.section === section &&
            !filtered.some((item) => item.label === option.label)
        );

        filtered.push(...sectionSkills);
      });
    }

    // Add option to create a new skill
    if (inputValue !== "") {
      filtered.push({
        inputValue: inputValue,
        label: `Add "${inputValue}"`,
        section: "Other Skills",
        selected: true,
      });
    }

    // Sort the filtered options by section to prevent duplicate headers
    return filtered.sort((a, b) => {
      if (a.section === b.section) {
        return a.label.localeCompare(b.label);
      }

      // Special handling for "Other Skills" to always appear last
      if (a.section === "Other Skills") return 1;
      if (b.section === "Other Skills") return -1;

      return a.section.localeCompare(b.section);
    });
  };

  return (
    <>
      <Autocomplete<AutoCompleteOption, false, false, true>
        ref={autocompleteRef}
        value={value}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        onChange={handleAutocompleteChange}
        groupBy={(option) => option.section}
        filterOptions={handleAutocompleteFilter}
        options={autoCompleteOptions}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search Skills or Sections" />
        )}
        renderGroup={renderAutocompleteGroup}
      />
      <AddSkillDialog
        {...{
          dialogValue,
          setDialogValue,
          handleClose,
          handleSubmit,
          open,
          sectionContent,
        }}
        availableSections={uniqueSections}
      />
    </>
  );
};

export default SkillSelector;
