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
      const section = skill.section;
      const currentSection = updatedContent[section];

      if (currentSection) {
        let updatedSkills: AutoCompleteOption[] = [...currentSection.skills];
        const currentSkill = updatedSkills.find((s) => s.label === skill.label);

        if (!currentSkill) {
          updatedSkills.push(skill);
        } else {
          updatedSkills = updatedSkills.map((s) =>
            s.label === skill.label ? { ...s, selected: !s.selected } : { ...s }
          );
        }
        const allSelected = updatedSkills.every((s) => s.selected);
        const someSelected = updatedSkills.some((s) => s.selected);

        updatedContent[section] = {
          allSelected,
          someSelected,
          skills: updatedSkills,
        };
      } else {
        updatedContent[section] = {
          allSelected: true,
          someSelected: true,
          skills: [skill],
        };
      }
      return updatedContent;
    });
  };

  useEffect(() => {
    skillData.forEach(({ data = [], title: section }) => {
      let allSelected = true;
      let someSelected = false;
      let skills: AutoCompleteOption[] = [];
      const currentSection = sectionContent[section];
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
      setSectionContent((prev) => ({
        ...prev,
        [section]: { allSelected, someSelected, skills },
      }));
    });
  }, [sectionContent, skillData]);

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
