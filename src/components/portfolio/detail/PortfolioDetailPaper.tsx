import React, { Fragment } from "react";
import {
  ArrowOutward,
  AssignmentInd,
  Build,
  Close,
  Collections,
  Description,
  EmojiObjects,
  Memory,
  Menu,
  People,
} from "@mui/icons-material";
import {
  Paper,
  IconButton,
  Typography,
  Divider,
  Slide,
  Box,
  Stack,
  List,
  ListItem,
  ButtonGroup,
  Button,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@mui/material";
import ImageCarousel from "@components/image-carousel/ImageCarousel";
import TagChips from "@components/TagChips";
import { isTechStack, isRole, isPortfolioImage } from "@utils/typeGuards";
import { toSentenceCase } from "@utils/utils";
import ReactMarkdown from "react-markdown";
import {
  TechStack,
  Role,
  PortfolioItemImage,
  PortfolioItem,
} from "types/global";
import PortfolioDetailMenu from "./PortfolioDetailMenu";

interface PortfolioDetailPaperProps {
  toggleMenu: () => void;
  portfolioDetail: PortfolioItem;
  isMenuOpen: boolean;
}

type PortfolioItemKeys = keyof PortfolioItem;

const headers: PortfolioItemKeys[] = [
  "roles",
  "description",
  "contributions",
  "problemSolving",
  "shareholderDescription",
  "techStack",
  "images",
];

const icons: { [K in PortfolioItemKeys]?: React.ElementType } = {
  description: Description,
  roles: AssignmentInd,
  contributions: Build,
  shareholderDescription: People,
  problemSolving: EmojiObjects,
  techStack: Memory,
  images: Collections,
};

const PortfolioDetailPaper = ({
  toggleMenu,
  portfolioDetail,
  isMenuOpen,
}: PortfolioDetailPaperProps) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const shouldShowMobileMenu = isMdDown ? isMenuOpen : false;

  return (
    <>
      <PortfolioDetailMenu
        display={{ xs: "none", md: "block" }}
        portfolioDetail={portfolioDetail}
        headers={headers}
      />
      <Paper className="p-4 mb-4 flex flex-col" id="detail">
        <Stack direction="row" justifyContent="space-between">
          <IconButton
            onClick={toggleMenu}
            size="large"
            sx={{
              alignSelf: "flex-start",
              ml: "-12px",
              mt: "-12px",
              display: { xs: "block", md: "none" },
            }}
          >
            {isMenuOpen ? (
              <Close fontSize="inherit" />
            ) : (
              <Menu fontSize="inherit" />
            )}
          </IconButton>
          <Collapse in={shouldShowMobileMenu} timeout={150}>
            <PortfolioDetailMenu
              portfolioDetail={portfolioDetail}
              headers={headers}
              isMobile
            />
          </Collapse>
        </Stack>
        <Typography variant="decoration">Project:</Typography>
        <Typography component="h2" variant="h4">
          {portfolioDetail.subheader}
        </Typography>
        <Divider className="my-2" />
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
          const Icon = icons[key]!;
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
                          <ReactMarkdown
                            children={item}
                            components={{ p: Fragment }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )
                ) : (
                  <Typography variant="body1">
                    <ReactMarkdown
                      children={data}
                      components={{ p: Fragment }}
                    />
                  </Typography>
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
    </>
  );
};

export default PortfolioDetailPaper;
