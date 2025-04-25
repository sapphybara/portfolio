import {
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  Stack,
  Button,
  styled,
} from "@mui/material";
import CollapsibleCard from "@components/CollapsibleCard";
import { ResumeDataItem } from "types/global";
import {
  BusinessCenterOutlined,
  DeveloperBoardOutlined,
  Download,
  LightbulbOutlined,
  SchoolOutlined,
  ScienceOutlined,
  TerminalOutlined,
} from "@mui/icons-material";
import resumeData from "@assets/json/resume_data.json";
import { isResumeDataItem } from "@utils/typeGuards";
import ReactMarkdown from "react-markdown";
import { Fragment } from "react";

const avatarRecord = {
  skills: TerminalOutlined,
  experience: BusinessCenterOutlined,
  experience1: DeveloperBoardOutlined,
  experience2: LightbulbOutlined,
  experience3: ScienceOutlined,
  education: SchoolOutlined,
  education1: null,
  education2: null,
};

const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  listStyleType: "disc",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: theme.spacing(1),
}));

const Resume = () => {
  const renderResumeData = (
    {
      data = [],
      dataType,
      id,
      subheaderTypographyProps = {
        component: "h4",
        variant: "h6",
      },
      title,
      titleTypographyProps,
      ...cardProps
    }: ResumeDataItem,
    nestLevel: 2 | 3 | 4 | 5 = 2
  ) => {
    if (!titleTypographyProps) {
      titleTypographyProps = {
        component: `h${nestLevel}` as "h2" | "h3" | "h4" | "h5",
        variant: `h${nestLevel + 1}` as "h3" | "h4" | "h5" | "h6",
      };
    }
    const newNestLevel = Math.min(nestLevel + 1, 5) as 2 | 3 | 4 | 5;
    const Avatar = avatarRecord[id as keyof typeof avatarRecord];

    return (
      <CollapsibleCard
        key={title}
        title={title}
        subheaderTypographyProps={subheaderTypographyProps}
        titleTypographyProps={titleTypographyProps}
        {...cardProps}
        avatar={Avatar && <Avatar fontSize="large" />}
      >
        {data.length && (
          <CardContent component={Stack} gap={2} id={title}>
            {data.every(isResumeDataItem) ? (
              dataType === "flat" ? (
                <StyledList>
                  {data
                    .flatMap((category) => category.data as string[])
                    .map((text) => (
                      <ListItem className="list-item" key={text} disableGutters>
                        {
                          <ReactMarkdown
                            children={text}
                            components={{ p: Fragment }}
                          />
                        }
                      </ListItem>
                    ))}
                </StyledList>
              ) : (
                data.map((d) => renderResumeData(d, newNestLevel))
              )
            ) : dataType === "list" ? (
              <StyledList>
                {data.map((text) => (
                  <ListItem className="list-item" key={text} disableGutters>
                    {
                      <ReactMarkdown
                        children={text}
                        components={{ p: Fragment }}
                      />
                    }
                  </ListItem>
                ))}
              </StyledList>
            ) : dataType === "paragraph" ? (
              data.map((text) => (
                <Typography key={text} paragraph>
                  {
                    <ReactMarkdown
                      children={text}
                      components={{
                        p: Fragment,
                        a: (props) => <a {...props} target="_blank" />,
                      }}
                    />
                  }
                </Typography>
              ))
            ) : null}
          </CardContent>
        )}
      </CollapsibleCard>
    );
  };

  return (
    <Box component="section">
      <Typography variant="decoration">View my</Typography>
      <Typography variant="h1">Resume</Typography>
      <Stack alignItems="flex-end">
        <Stack
          alignItems="start"
          gap={{ xs: 0.5, sm: 3 }}
          direction={{ xs: "column", sm: "row" }}
          marginTop={2}
        >
          <Typography className="max-w-[48rem]" paragraph>
            Creative and driven Front End Developer with a strong foundation in
            both design and development, and a passion for both. Thrives in
            collaborative environments - and on the volleyball court.
          </Typography>
          <Button
            className="flex-[1_0_auto]"
            download
            href="/Sapphyra_Wiser_Resume.pdf"
            LinkComponent="a"
            startIcon={<Download />}
            variant="outlined"
          >
            Download Resume
          </Button>
        </Stack>
        <Box className="flex flex-col gap-8 my-4">
          {(resumeData as ResumeDataItem[]).map((d) => renderResumeData(d))}
        </Box>
      </Stack>
    </Box>
  );
};
export default Resume;
