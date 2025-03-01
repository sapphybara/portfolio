import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ResumeDataItem, StringResumeDataItem } from "types/global";
import data from "@assets/json/resume_data.json";
import SkillSelector from "@components/resume/SkillSelector";
import { useFetcher } from "react-router-dom";
import useSkillsManager from "@hooks/useSkillsManager";

const resumeData = data as ResumeDataItem[];

const skillsData =
  (resumeData.find((item: ResumeDataItem) => item.id === "skills")
    ?.data as StringResumeDataItem[]) || [];
const experienceData =
  (resumeData.find((item: ResumeDataItem) => item.id === "experience")
    ?.data as ResumeDataItem[]) || [];
const educationData =
  (resumeData.find((item: ResumeDataItem) => item.id === "education")
    ?.data as ResumeDataItem[]) || [];

const ResumeBuilder: React.FC = () => {
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("Front End Engineer");
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(false);

  const fetcher = useFetcher();

  const {
    autoCompleteOptions,
    getSectionSelectionStatus,
    handleSectionSelection,
    handleSkillSelection,
    sectionContent,
  } = useSkillsManager(skillsData);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.error) {
        setErr(fetcher.data.error);
      } else {
        // Data URL can be used directly
        const link = document.createElement("a");
        link.href = fetcher.data.url;
        link.download = "resume.pdf";
        link.click();
        setErr("");
      }
      setLoading(false);
    }
  }, [fetcher.state, fetcher.data]);

  const handleGenerateResume = () => {
    setLoading(true);
    const formData = new FormData();
    const selectedSkills = Object.values(sectionContent).flatMap((section) =>
      section.skills
        .filter((skill) => skill.selected)
        .map((skill) => skill.label)
    );
    formData.append("jobTitle", jobTitle);
    formData.append("selectedSkills", JSON.stringify(selectedSkills));
    formData.append(
      "experience",
      JSON.stringify(
        experienceData.map((exp) => ({
          title: exp.title,
          subheader: exp.subheader,
          data: exp.data,
        }))
      )
    );
    formData.append(
      "education",
      JSON.stringify(
        educationData.map((edu) => ({
          title: edu.title,
          subheader: edu.subheader,
        }))
      )
    );
    formData.append("isSandboxMode", isSandboxMode.toString());

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Stack
      component={fetcher.Form}
      method="post"
      spacing={2}
      // Prevent form submission on Enter key in autocomplete
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <Typography variant="h4">Resume Builder</Typography>
      {err && (
        <Stack direction="row">
          <Typography color="error">{err}</Typography>
          <Button onClick={() => setErr("")}>Okay</Button>
        </Stack>
      )}
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Set Job Title</Typography>
        <TextField
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          variant="standard"
        />
        <Typography variant="h6">Select Skills</Typography>
        <SkillSelector
          autoCompleteOptions={autoCompleteOptions}
          getSectionSelectionStatus={getSectionSelectionStatus}
          handleSkillChange={handleSkillSelection}
          handleSectionSelection={handleSectionSelection}
          sectionContent={sectionContent}
        />
        <div>
          {Object.entries(sectionContent).map(
            ([section, { allSelected, someSelected, skills }], i) => (
              <Paper elevation={i % 2} key={section} className="px-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allSelected}
                      indeterminate={!allSelected && someSelected}
                      onChange={() => handleSectionSelection(section)}
                    />
                  }
                  label={section}
                />
                <div className="pl-6">
                  {skills.map((skill) => {
                    const { label, selected } = skill;
                    return (
                      <FormControlLabel
                        key={label}
                        control={
                          <Checkbox
                            checked={selected}
                            onChange={() => handleSkillSelection(skill)}
                          />
                        }
                        label={label}
                      />
                    );
                  })}
                </div>
              </Paper>
            )
          )}
        </div>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => setIsSandboxMode((prev) => !prev)}
            value={isSandboxMode}
          />
        }
        label="Sandbox Mode"
        labelPlacement="end"
      />
      <Button
        variant="contained"
        color="primary"
        className="w-fit"
        onClick={handleGenerateResume}
        disabled={loading}
        startIcon={loading && <CircularProgress size={16} />}
        type="submit"
      >
        Generate Resume
      </Button>
    </Stack>
  );
};

export default ResumeBuilder;
