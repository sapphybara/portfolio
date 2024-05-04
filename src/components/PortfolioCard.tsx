import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PortfolioItem } from "types/global";
import MyLink from "./MyLink";
import { ArrowOutward } from "@mui/icons-material";
import TagChips from "./TagChips";

const PortfolioWrapper = styled(Card)(({ theme }) => ({
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
  linkInfo,
  shortDescription,
}: PortfolioItem) => {
  const navigate = useNavigate();

  return (
    <PortfolioWrapper
      className="mb-4 portfolio-card flex flex-col justify-between"
      key={title}
      id={title.replace(/\s/g, "-")}
    >
      <CardActionArea
        className="items-start flex flex-1"
        onClick={() => navigate(`/portfolio/${id}`)}
      >
        <CardContent className="pt-0">
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
          component={CardActions}
        >
          <Typography className="mb-0" color="text.secondary" paragraph>
            Project on behalf of: {affiliation}
          </Typography>
          <MyLink {...linkInfo}>
            <Typography className="mb-0" paragraph>
              View Project
            </Typography>
            {linkInfo.target === "_blank" && <ArrowOutward fontSize="small" />}
          </MyLink>
        </Stack>
      </CardContent>
    </PortfolioWrapper>
  );
};

export default PortfolioCard;
