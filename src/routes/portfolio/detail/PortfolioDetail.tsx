import {
  ArrowOutward,
  AssignmentInd,
  Build,
  Collections,
  Description,
  EmojiObjects,
  Memory,
  People,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  Button,
  Stack,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MyLink from "@components/MyLink";
import TagChips from "@components/TagChips";
import { toSentenceCase } from "@utils/utils";
import { isPortfolioImage, isTechStack } from "@utils/typeGuards";
import {
  PortfolioItem,
  PortfolioItemImage,
  Roles,
  TechStack,
} from "types/global";
import { isRole } from "@utils/typeGuards";
import ImageCarousel from "@components/ImageCarousel";

const headers = [
  "roles",
  "description",
  "contributions",
  "problemSolving",
  "shareholderDescription",
  "techStack",
  "images",
] as const; // using const assertion to create a tuple of string literals

type HeaderKeys = Extract<keyof PortfolioItem, (typeof headers)[number]>;

const icons: Record<HeaderKeys, React.ElementType> = {
  description: Description,
  roles: AssignmentInd,
  contributions: Build,
  shareholderDescription: People,
  problemSolving: EmojiObjects,
  techStack: Memory,
  images: Collections,
};

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioItem;
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  if (!portfolioDetail) {
    return (
      <Box className="mt-4">
        <Typography variant="decoration">Not found</Typography>
        <Typography component="h2" variant="h5">
          Portfolio not found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row">
        {isMdUp && (
          <Box className="sticky top-16 h-[calc(100vh-101px)] pr-2">
            <Typography variant="h5">Overview</Typography>
            <List>
              <ListItem className="text-right">
                <MyLink to="#detail">Portfolio Detail</MyLink>
              </ListItem>
              {headers.map((header) =>
                portfolioDetail[header] ? (
                  <ListItem className="text-right" key={header}>
                    <MyLink to={`#${header}`}>{toSentenceCase(header)}</MyLink>
                  </ListItem>
                ) : null
              )}
            </List>
          </Box>
        )}
        <Box>
          <Paper className="p-4 mb-4 flex flex-col" id="detail">
            <Typography variant="decoration">Portfolio detail</Typography>
            <Typography variant="h3">{portfolioDetail.title}</Typography>
            <Divider className="my-4" />
            <Typography component="h4" variant="h5">
              {portfolioDetail.subheader}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              I built this project while working for:&nbsp;
              {portfolioDetail.affiliation}
            </Typography>
            {headers.map((key) => {
              const data = portfolioDetail[key] as
                | string
                | string[]
                | TechStack[]
                | Roles[]
                | PortfolioItemImage[]
                | undefined;
              if (!data) {
                return null;
              }
              const Icon = icons[key];

              return (
                <Slide
                  className="mt-4"
                  direction="up"
                  in
                  mountOnEnter
                  unmountOnExit
                  key={key}
                >
                  <Box id={key}>
                    <Stack
                      alignItems="center"
                      className="mb-2"
                      direction="row"
                      gap={1}
                    >
                      <Icon />
                      <Typography variant="h6">
                        {key === "roles" ? "Role(s)" : toSentenceCase(key)}
                      </Typography>
                    </Stack>
                    {Array.isArray(data) ? (
                      data.every(isTechStack) || data.every(isRole) ? (
                        <TagChips items={data as TechStack[] | Roles[]} />
                      ) : data.every(isPortfolioImage) ? (
                        <ImageCarousel images={data} />
                      ) : (
                        <List className="ml-8 list-disc">
                          {data.map((item, index) => (
                            <ListItem
                              className="p-0 pb-2 list-item"
                              key={index}
                              disableGutters
                            >
                              {item}
                            </ListItem>
                          ))}
                        </List>
                      )
                    ) : (
                      <Typography variant="body1">{data}</Typography>
                    )}
                  </Box>
                </Slide>
              );
            })}
            <Divider className="my-4" />
            {portfolioDetail.linkInfo && (
              <Button
                className="ml-auto"
                endIcon={
                  portfolioDetail.linkInfo.target === "_blank" && (
                    <ArrowOutward className="text-black" />
                  )
                }
                variant="contained"
                {...portfolioDetail.linkInfo}
                LinkComponent={MyLink}
              >
                View the project
              </Button>
            )}
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default PortfolioDetail;
