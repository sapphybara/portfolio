import { ArrowBack, ArrowOutward } from "@mui/icons-material";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import MyLink from "src/components/MyLink";
import TechnologyChips from "src/components/TechnologyChips";
import { camelToSentenceCase } from "src/utils/utils";
import { PortfolioCard } from "types/global";

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioCard;

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
        startIcon={<ArrowBack color="primary" />}
        href="/portfolio"
        variant="outlined"
      >
        Back to Portfolio
      </Button>
      <Paper className="p-4 mb-4 flex flex-col" id="detail">
        <Typography variant="decoration">Portfolio detail</Typography>
        <Typography variant="h3">{portfolioDetail.title}</Typography>
        <Divider />
        <Typography className="my-2" component="h4" variant="h5">
          {portfolioDetail.subheader}
        </Typography>
        <Typography variant="subtitle1">
          {portfolioDetail.affiliation}
        </Typography>
        {[
          "description",
          "role",
          "contributions",
          "shareholderDescription",
          "problemSolving",
        ].map((key) => {
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
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1">{data}</Typography>
              )}
            </Fragment>
          );
        })}
        <Typography className="mb-2" variant="h6">
          Technologies Used
        </Typography>
        <TechnologyChips technology={portfolioDetail.techStack} />
        <Button
          className="ml-auto"
          endIcon={
            portfolioDetail.linkInfo.target === "_blank" && (
              <ArrowOutward sx={{ color: "#000" }} />
            )
          }
          variant="contained"
          {...portfolioDetail.linkInfo}
          LinkComponent={MyLink}
        >
          View the project
        </Button>
      </Paper>
    </>
  );
};

export default PortfolioDetail;
