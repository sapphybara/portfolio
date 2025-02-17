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
import { ResumeDataItem } from "types/global";
import data from "@assets/json/resume_data.json";
import { useFetcher } from "react-router-dom";

const resumeData = data as ResumeDataItem[];

const skillsData =
  (resumeData.find((item: ResumeDataItem) => item.id === "skills")
    ?.data as ResumeDataItem[]) || [];
const experienceData =
  (resumeData.find((item: ResumeDataItem) => item.id === "experience")
    ?.data as ResumeDataItem[]) || [];
const educationData =
  (resumeData.find((item: ResumeDataItem) => item.id === "education")
    ?.data as ResumeDataItem[]) || [];
const allSkills = skillsData.flatMap((skill) => (skill.data as string[]) || []);

const ResumeBuilder: React.FC = () => {
  const [err, setErr] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(allSkills);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("Front End Engineer");

  const fetcher = useFetcher();

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

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleGenerateResume = () => {
    setLoading(true);
    const formData = new FormData();
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

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <Stack component={fetcher.Form} method="post" spacing={2}>
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
        <div>
          {skillsData.map((skillGroup, i) => {
            const allSelected = (skillGroup.data as string[]).every((skill) =>
              selectedSkills.includes(skill)
            );
            const someSelected = (skillGroup.data as string[]).some((skill) =>
              selectedSkills.includes(skill)
            );
            return (
              <Paper elevation={i % 2} key={skillGroup.id} className="px-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allSelected}
                      indeterminate={!allSelected && someSelected}
                      onChange={() =>
                        setSelectedSkills((prevSkills) =>
                          allSelected
                            ? prevSkills.filter(
                                (skill) =>
                                  !(skillGroup.data as string[]).includes(skill)
                              )
                            : [
                                ...prevSkills,
                                ...(skillGroup.data as string[]).filter(
                                  (skill) => !prevSkills.includes(skill)
                                ),
                              ]
                        )
                      }
                    />
                  }
                  label={skillGroup.title}
                />
                <div className="pl-6">
                  {((skillGroup.data as string[]) || []).map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                        />
                      }
                      label={skill}
                    />
                  ))}
                </div>
              </Paper>
            );
          })}
        </div>
      </Box>
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
