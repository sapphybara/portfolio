import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PortfolioCard as PortfolioCardType } from "types/global";
import MyLink from "./MyLink";
import {
  ArrowOutward,
  BugReportOutlined,
  BuildOutlined,
  CodeOutlined,
  DesignServicesOutlined,
  DesktopWindowsOutlined,
  ExtensionOutlined,
  StorageOutlined,
} from "@mui/icons-material";

const PortfolioWrapper = styled(Card)(({ theme }) => ({
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const PortfolioCard = ({
  id,
  title,
  subheader,
  affiliation,
  techStack,
  linkInfo,
  shortDescription,
}: PortfolioCardType) => {
  const navigate = useNavigate();

  const renderTagIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <DesktopWindowsOutlined color="secondary" fontSize="small" />;
      case "backend":
        return <StorageOutlined color="secondary" fontSize="small" />;
      case "fullstack":
        return <CodeOutlined color="secondary" fontSize="small" />;
      case "design":
        return <DesignServicesOutlined color="secondary" fontSize="small" />;
      case "testing":
        return <BugReportOutlined color="secondary" fontSize="small" />;
      case "tooling":
        return <BuildOutlined color="secondary" fontSize="small" />;
      default:
        return <ExtensionOutlined color="secondary" fontSize="small" />;
    }
  };

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
            subheader={subheader}
            subheaderTypographyProps={{ variant: "h6", component: "h4" }}
          />
          <Stack direction="row" gap={1}>
            {techStack.map(({ name, cardType }) => (
              <Chip key={name} label={name} icon={renderTagIcon(cardType)} />
            ))}
          </Stack>
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
