import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { PortfolioItem } from "types/global";
import { GitHub, LinkOutlined } from "@mui/icons-material";
import TagChips from "@components/TagChips";

const PortfolioCardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  ...(theme.palette.mode === "dark" && {
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
  }),
}));

const PortfolioCard = ({
  id,
  title,
  affiliation,
  techStack,
  links,
  shortDescription,
}: PortfolioItem) => (
  <PortfolioCardWrapper key={title} id={title.replace(/\s/g, "-")}>
    <CardActionArea className="items-start flex-1" href={`/portfolio/${id}`}>
      <CardContent className="pt-0 flex flex-col">
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "h3", component: "h3" }}
        />
        <TagChips items={techStack} />
        <Typography className="mt-4 mx-4" paragraph>
          {shortDescription}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardContent className="pt-0">
      <Stack
        alignItems="center"
        direction="row"
        gap={1}
        justifyContent="space-between"
        component={CardActions}
      >
        <Typography className="mb-0" color="text.secondary" paragraph>
          Project on behalf of: {affiliation}
        </Typography>
        <Stack direction="row" gap={1}>
          {links?.map(({ type, ...link }, index) => (
            <Tooltip
              title={type === "code" ? "View Code" : "View Project"}
              key={index}
            >
              <IconButton
                aria-label={type === "code" ? "View Code" : "View Project"}
                rel="noopener noreferrer"
                target="_blank"
                {...link}
              >
                {type === "code" ? <GitHub /> : <LinkOutlined />}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </CardContent>
  </PortfolioCardWrapper>
);

export default PortfolioCard;
