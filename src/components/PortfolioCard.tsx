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
import { PortfolioCard as PortfolioCardType } from "types/global";
import MyLink from "./MyLink";
import { ArrowOutward } from "@mui/icons-material";
import TechnologyChips from "./TechnologyChips";

const PortfolioWrapper = styled(Card)(({ theme }) => ({
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const PortfolioCard = ({
  id,
  title,
  affiliation,
  techStack,
  linkInfo,
  shortDescription,
}: PortfolioCardType) => {
  const navigate = useNavigate();

  return (
    <PortfolioWrapper
      className="mb-4 portfolio-card"
      key={title}
      id={title.replace(/\s/g, "-")}
      variant="outlined"
    >
      <CardActionArea onClick={() => navigate(`/portfolio/${id}`)}>
        <CardContent className="pt-0">
          <CardHeader
            title={title}
            titleTypographyProps={{ variant: "h3", component: "h3" }}
          />
          <TechnologyChips technology={techStack} />
          <Typography className="mt-4 mx-4" paragraph>
            {shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent className="pt-0">
        <Stack alignItems="center" direction="row" component={CardActions}>
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
