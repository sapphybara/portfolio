import { Clear, FilterListOff } from "@mui/icons-material";
import { IconButton, Stack, TextField, Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

  // State to store unique values initialized once
  const [uniqueTechStackCardTypes, setUniqueTechStackCardTypes] = useState<
    Set<string>
  >(new Set());
  const [uniqueRoles, setUniqueRoles] = useState<Set<string>>(new Set());
  const [uniqueAffiliations, setUniqueAffiliations] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    // Initialize unique filters once on load
    const techStackTypes = new Set(
      portfolioCardsJSON.flatMap((card) =>
        card.techStack.map((tech) => tech.name)
      )
    );

    const roles = new Set(portfolioCardsJSON.flatMap((card) => card.roles));

    const affiliations = new Set(
      portfolioCardsJSON.map((card) => card.affiliation)
    );

    setUniqueTechStackCardTypes(techStackTypes);
    setUniqueRoles(roles);
    setUniqueAffiliations(affiliations);
  }, [portfolioCardsJSON]);

  const applyFilters = (
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
        card.roles.some((role) => roleVal.includes(role))
      );
    }

    if (affiliationVal.length > 0) {
      filteredCards = filteredCards.filter((card) =>
        affiliationVal.includes(card.affiliation)
      );
    }

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
          options={Array.from(uniqueTechStackCardTypes)}
          value={techStackFilter}
          onChange={(value) => {
            setTechStackFilter(value);
            applyFilters(textFilter, value, roleFilter, affiliationFilter);
          }}
        />
        <FilterAutocomplete
          label="Role"
          placeholder="Filter by Role"
          options={Array.from(uniqueRoles)}
          value={roleFilter}
          onChange={(value) => {
            setRoleFilter(value);
            applyFilters(textFilter, techStackFilter, value, affiliationFilter);
          }}
        />
        <FilterAutocomplete
          label="Affiliation"
          placeholder="Filter by Affiliation"
          options={Array.from(uniqueAffiliations)}
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
            alignSelf: { xs: "stretch", sm: "flex-start" },
          }}
        >
          Clear Filters
        </Button>
      </Stack>
    </Stack>
  );
};

export default PortfolioActions;
