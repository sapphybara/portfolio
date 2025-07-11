import { Clear, FilterListOff } from "@mui/icons-material";
import { IconButton, Stack, TextField, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { PortfolioItem } from "types/global";
import FilterAutocomplete from "@components/FilterAutocomplete";

interface PortfolioActionsProps {
  portfolioCardsJSON: PortfolioItem[];
  setPortfolioCards: Dispatch<SetStateAction<PortfolioItem[]>>;
}

const PortfolioActions = ({
  portfolioCardsJSON,
  setPortfolioCards,
}: PortfolioActionsProps) => {
  const [textFilter, setTextFilter] = useState("");
  const [techStackFilter, setTechStackFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [affiliationFilter, setAffiliationFilter] = useState<string[]>([]);

  // Shared filtering logic
  const getFilteredCards = (
    textVal: string,
    techStackVal: string[],
    roleVal: string[],
    affiliationVal: string[]
  ) => {
    let filteredCards = portfolioCardsJSON;

    if (textVal.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        Object.values(card).some((value) =>
          new RegExp(textVal, "i").test(value)
        )
      );
    }

    if (techStackVal.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        card.techStack.some((tech) => techStackVal.includes(tech.name))
      );
    }

    if (roleVal.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        card.roles.some((role) => roleVal.includes(role.name))
      );
    }

    if (affiliationVal.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        affiliationVal.includes(card.affiliation)
      );
    }

    return filteredCards;
  };

  // Get filtered options based on current filter state
  const getFilteredOptions = (
    filterType: "techStack" | "role" | "affiliation"
  ) => {
    // Apply existing filters except for the current filter type
    const filteredCards = getFilteredCards(
      textFilter,
      filterType !== "techStack" ? techStackFilter : [],
      filterType !== "role" ? roleFilter : [],
      filterType !== "affiliation" ? affiliationFilter : []
    );

    // Extract unique values for the requested filter type
    switch (filterType) {
      case "techStack":
        return Array.from(
          new Set(
            filteredCards.flatMap((card) =>
              card.techStack.map((tech) => tech.name)
            )
          )
        );
      case "role":
        return Array.from(
          new Set(
            filteredCards.flatMap((card) => card.roles.map((role) => role.name))
          )
        );
      case "affiliation":
        return Array.from(
          new Set(filteredCards.map((card) => card.affiliation))
        );
      default:
        return [];
    }
  };

  const applyFilters = (
    textVal: string,
    techStackVal: string[],
    roleVal: string[],
    affiliationVal: string[]
  ) => {
    const filteredCards = getFilteredCards(
      textVal,
      techStackVal,
      roleVal,
      affiliationVal
    );
    setPortfolioCards(filteredCards);
  };

  const clearAllFilters = () => {
    setTextFilter("");
    setTechStackFilter([]);
    setRoleFilter([]);
    setAffiliationFilter([]);
    applyFilters("", [], [], []);
  };

  const hasActiveFilters =
    textFilter.length > 0 ||
    techStackFilter.length > 0 ||
    roleFilter.length > 0 ||
    affiliationFilter.length > 0;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={2}
      alignItems={{ xs: "stretch", md: "flex-end" }}
      flexWrap="wrap"
    >
      <TextField
        sx={{
          flexGrow: 1,
        }}
        InputProps={{
          ...(textFilter.length && {
            endAdornment: (
              <IconButton
                aria-label="Clear Input"
                onClick={() => {
                  setTextFilter("");
                  applyFilters(
                    "",
                    techStackFilter,
                    roleFilter,
                    affiliationFilter
                  );
                }}
              >
                <Clear />
              </IconButton>
            ),
          }),
        }}
        placeholder="Search Projects"
        value={textFilter}
        onChange={({ target: { value } }) => {
          setTextFilter(value);
          applyFilters(value, techStackFilter, roleFilter, affiliationFilter);
        }}
        label="Find a Project by a Search Term"
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={1}
        sx={{
          flexShrink: 0,
          minWidth: { xs: "100%", md: "auto" },
        }}
        width="100%"
      >
        <FilterAutocomplete
          label="Tech Stack"
          placeholder="Filter Tech Stack"
          options={getFilteredOptions("techStack")}
          value={techStackFilter}
          onChange={(value) => {
            setTechStackFilter(value);
            applyFilters(textFilter, value, roleFilter, affiliationFilter);
          }}
        />
        <FilterAutocomplete
          label="Role"
          placeholder="Filter by Role"
          options={getFilteredOptions("role")}
          value={roleFilter}
          onChange={(value) => {
            setRoleFilter(value);
            applyFilters(textFilter, techStackFilter, value, affiliationFilter);
          }}
        />
        <FilterAutocomplete
          label="Affiliation"
          placeholder="Filter by Affiliation"
          options={getFilteredOptions("affiliation")}
          value={affiliationFilter}
          onChange={(value) => {
            setAffiliationFilter(value);
            applyFilters(textFilter, techStackFilter, roleFilter, value);
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListOff />}
          onClick={clearAllFilters}
          disabled={!hasActiveFilters}
          sx={{
            minWidth: "auto",
            whiteSpace: "nowrap",
            alignSelf: "stretch",
            maxHeight: "56px",
          }}
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};

export default PortfolioActions;
