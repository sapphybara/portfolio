import { useEffect, useState } from "react";
import {
  AutoCompleteOption,
  SectionContent,
  StringResumeDataItem,
} from "types/global";

const useSkillsManager = (skillData: StringResumeDataItem[]) => {
  const [sectionContent, setSectionContent] = useState<SectionContent>({});

  const getSectionSelectionStatus = (section: string) => {
    const currentSection = sectionContent[section];
    return currentSection ? currentSection.allSelected : false;
  };

  const handleSectionSelection = (section: string) => {
    setSectionContent((prev) => {
      const updatedContent = { ...prev };
      const currentSection = updatedContent[section];
      if (currentSection) {
        const newAllSelected = !currentSection.allSelected;

        updatedContent[section] = {
          allSelected: newAllSelected,
          someSelected: newAllSelected,
          skills: currentSection.skills.map((skill) => ({
            ...skill,
            selected: newAllSelected,
          })),
        };
      } else {
        console.warn(`Section "${section}" not found in sectionContent`);
      }
      return updatedContent;
    });
  };

  const handleSkillSelection = (skill: AutoCompleteOption) => {
    setSectionContent((prev) => {
      const updatedContent = { ...prev };
      let { label, section } = skill;
      label = label.toLowerCase();
      section = section.toLowerCase();
      // find the section using a lowercase key
      const selectedSectionData = Object.entries(updatedContent).find(
        ([k]) => k.toLowerCase() === section
      )?.[1] as SectionContent[string] | undefined;

      // Remove the skill from any other section if it exists
      const matchedSection = Object.keys(updatedContent)
        .find((key) =>
          updatedContent[key].skills.some(
            (s) => s.label.toLowerCase() === label
          )
        )
        ?.toLowerCase();
      if (matchedSection && matchedSection !== section) {
        updatedContent[matchedSection].skills = updatedContent[
          matchedSection
        ].skills.filter((s) => s.label.toLowerCase() !== label);
      }

      if (selectedSectionData) {
        let updatedSkills: AutoCompleteOption[] = [
          ...selectedSectionData.skills,
        ];
        const currentSkill = updatedSkills.find(
          (s) => s.label.toLowerCase() === label
        );

        if (!currentSkill) {
          updatedSkills.push(skill);
        } else {
          updatedSkills = updatedSkills.map((s) =>
            s.label.toLowerCase() === label
              ? { ...s, selected: !s.selected }
              : { ...s }
          );
        }
        const allSelected = updatedSkills.every((s) => s.selected);
        const someSelected = updatedSkills.some((s) => s.selected);

        selectedSectionData.allSelected = allSelected;
        selectedSectionData.someSelected = someSelected;
        selectedSectionData.skills = updatedSkills;
      } else {
        updatedContent[skill.section] = {
          allSelected: true,
          someSelected: true,
          skills: [skill],
        };
      }
      return updatedContent;
    });
  };

  useEffect(() => {
    setSectionContent((prev) => {
      const updatedContent = { ...prev };
      skillData.forEach(({ data = [], title: section }) => {
        let allSelected = true;
        let someSelected = false;
        let skills: AutoCompleteOption[] = [];
        const currentSection = updatedContent[section];
        if (currentSection) {
          allSelected = currentSection.allSelected;
          someSelected = currentSection.someSelected;
          skills = [...currentSection.skills];
        }

        data.forEach((skill) => {
          const currentSkill = skills.find((s) => s.label === skill);
          if (!currentSkill) {
            someSelected = true;
            skills.push({ label: skill, section, selected: true });
          }
        });
        updatedContent[section] = { allSelected, someSelected, skills };
      });
      return updatedContent;
    });
  }, [skillData]);

  return {
    autoCompleteOptions: Object.values(sectionContent).reduce(
      (acc, { skills }) => [...acc, ...skills],
      [] as AutoCompleteOption[]
    ),
    getSectionSelectionStatus,
    handleSectionSelection,
    handleSkillSelection,
    sectionContent,
  };
};

export default useSkillsManager;
