import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { camelToSentenceCase, isTechStack } from "src/utils/utils";
import { PortfolioCard } from "types/global";

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioCard;
  const navigate = useNavigate();

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
      <Button
        className="mb-4"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        variant="outlined"
      >
        Back to Portfolio
      </Button>
      <Paper className="p-4 mb-4 flex flex-col">
        <Typography variant="decoration">Portfolio detail</Typography>
        <Typography variant="h3">{portfolioDetail.title}</Typography>
        <Divider />
        <Typography className="my-2" component="h4" variant="h5">
          {portfolioDetail.subheader}
        </Typography>
        <Typography variant="subtitle1">
          {portfolioDetail.affiliation}
        </Typography>
        <Typography variant="h6">Description</Typography>
        <Typography variant="body1">{portfolioDetail.description}</Typography>
        <Typography variant="h6">Role</Typography>
        <Typography variant="body1">{portfolioDetail.role}</Typography>
        <Typography variant="h6">Technologies Used</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
          {portfolioDetail.techStack.map((tech, index) => (
            <Chip key={index} label={tech.name} variant="filled" />
          ))}
        </Box>
        {["contributions", "shareholderDescription", "problemSolving"].map(
          (key) => {
            const data = portfolioDetail[key as keyof PortfolioCard] as
              | string
              | string[]
              | undefined;
            if (!data) {
              return null;
            }

            return (
              <Fragment key={key}>
                <Typography variant="h6">{camelToSentenceCase(key)}</Typography>
                {Array.isArray(data) ? (
                  <List>
                    {data.map((item, index) => (
                      <ListItem key={index}>
                        {isTechStack(item) ? <Chip label={item.name} /> : item}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1">{data}</Typography>
                )}
              </Fragment>
            );
          }
        )}
        <Button
          className="ml-auto"
          variant="contained"
          {...portfolioDetail.linkInfo}
        >
          View the project
        </Button>
      </Paper>
    </>
  );
};

export default PortfolioDetail;
