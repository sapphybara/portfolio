import {
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  Link,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { camelToSentenceCase, isLinkInfo, isTechStack } from "src/utils/utils";
import { PortfolioCard } from "types/global";

const PortfolioDetail = () => {
  const portfolioDetail = useLoaderData() as PortfolioCard;

  return (
    <Paper className="p-4 mb-4">
      <Typography variant="decoration">Portfolio detail</Typography>
      <Typography variant="h3">{portfolioDetail.title}</Typography>
      <Divider />
      <Typography className="my-2" component="h4" variant="h5">
        {portfolioDetail.subheader}
      </Typography>
      <Typography variant="subtitle1">{portfolioDetail.affiliation}</Typography>
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
          const data = portfolioDetail[key as keyof PortfolioCard];
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
                <Typography variant="body1">
                  {isLinkInfo(data) ? <Link {...data} /> : data}
                </Typography>
              )}
            </Fragment>
          );
        }
      )}
    </Paper>
  );
};

export default PortfolioDetail;
