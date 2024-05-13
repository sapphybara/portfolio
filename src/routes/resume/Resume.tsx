import {
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  Stack,
  Button,
} from "@mui/material";
import CollapsibleCard from "@components/CollapsibleCard";
import { SharedCardHeaderProps } from "types/global";
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

type DataType = "list" | "paragraph";

interface BaseResumeDataItem extends Omit<SharedCardHeaderProps, "title"> {
  defaultIsOpen?: boolean;
  id: string;
  title: string;
}

interface StringResumeDataItem extends BaseResumeDataItem {
  data: string[];
  dataType: DataType;
}

interface NestedResumeDataItem extends BaseResumeDataItem {
  data: ResumeDataItem[];
  dataType?: DataType;
}

type ResumeDataItem = StringResumeDataItem | NestedResumeDataItem;

// Type guard function to check if an element is a ResumeDataItem
const isResumeDataItem = (item: unknown): item is ResumeDataItem =>
  typeof item === "object" &&
  item !== null &&
  "data" in item &&
  Array.isArray(item.data) &&
  item.data.every(
    (dataItem: unknown) =>
      typeof dataItem === "string" || isResumeDataItem(dataItem)
  );

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

const Resume = () => {
  const renderResumeData = (
    {
      data,
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
              data.map((d) => renderResumeData(d, newNestLevel))
            ) : dataType === "list" ? (
              <List
                className="p-0 list-disc grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
                component={Stack}
                flexWrap="wrap"
                gap={1}
              >
                {data.map((text) => (
                  <ListItem className="list-item" key={text} disableGutters>
                    {text}
                  </ListItem>
                ))}
              </List>
            ) : dataType === "paragraph" ? (
              data.map((text) => (
                <Typography key={text} paragraph>
                  {text}
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
        <Button
          download
          href="/resume.pdf"
          LinkComponent="a"
          startIcon={<Download />}
          variant="outlined"
        >
          Download Resume
        </Button>
        <Box className="flex flex-col gap-8 my-4">
          {(resumeData as ResumeDataItem[]).map((d) => renderResumeData(d))}
        </Box>
      </Stack>
    </Box>
  );
};
export default Resume;
