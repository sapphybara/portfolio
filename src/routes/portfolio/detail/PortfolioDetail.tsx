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
  ButtonGroup,
  styled,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MyLink from "@components/MyLink";
import TagChips from "@components/TagChips";
import { toSentenceCase } from "@utils/utils";
import { isPortfolioImage, isTechStack } from "@utils/typeGuards";
import {
  PortfolioItem,
  PortfolioItemImage,
  Role,
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

const icons: { [K in HeaderKeys]: React.ElementType } = {
  description: Description,
  roles: AssignmentInd,
  contributions: Build,
  shareholderDescription: People,
  problemSolving: EmojiObjects,
  techStack: Memory,
  images: Collections,
};

const AnchorLink = styled(MyLink)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AnchorWrapper = styled(Box)(({ theme }) => ({
  "& .MuiTypography-root": {
    textAlign: "right",
  },
  "& .MuiList-root .MuiListItem-root": {
    justifyContent: "flex-end",
    textAlign: "right",
  },
  ...(useMediaQuery(theme.breakpoints.up("sm"))
    ? {
        position: "sticky",
        top: theme.spacing(16),
        height: "calc(100vh - 101px)",
        paddingRight: theme.spacing(2),
      }
    : {}),
}));

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioItem;
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

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
      <Stack direction={isSmUp ? "row" : "column"}>
        <AnchorWrapper>
          <Typography variant="h5">Overview</Typography>
          <List>
            <ListItem>
              <AnchorLink to="#detail">Portfolio Detail</AnchorLink>
            </ListItem>
            {headers.map((header) =>
              portfolioDetail[header] ? (
                <ListItem key={header}>
                  <AnchorLink to={`#${header}`}>
                    {toSentenceCase(header)}
                  </AnchorLink>
                </ListItem>
              ) : null
            )}
          </List>
        </AnchorWrapper>
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
                | Role[]
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
                        <TagChips items={data as TechStack[] | Role[]} />
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
            <ButtonGroup className="ml-auto" variant="outlined">
              {portfolioDetail.links?.map(({ type, href }) => (
                <Button
                  endIcon={<ArrowOutward />}
                  href={href}
                  key={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {type === "code" ? "View Code" : "View Project"}
                </Button>
              ))}
            </ButtonGroup>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default PortfolioDetail;
