import { ArrowBack } from "@mui/icons-material";
import {
  BoxProps,
  Button,
  Typography,
  List,
  ListItem,
  Box,
  styled,
  useMediaQuery,
  Link,
} from "@mui/material";
import { toSentenceCase } from "@utils/utils";
import { forwardRef } from "react";
import { PortfolioItem } from "types/global";

interface PortfolioDetailMenuProps {
  headers: (keyof PortfolioItem)[];
  portfolioDetail: PortfolioItem;
  display?: BoxProps["display"];
  isMobile?: boolean;
}

const AnchorLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AnchorWrapper = styled(Box)(({ theme }) => ({
  minWidth: "fit-content",
  "& .MuiTypography-root": {
    textAlign: "right",
  },
  "& .MuiList-root .MuiListItem-root": {
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: 0,
  },
  ...(useMediaQuery(theme.breakpoints.up("sm"))
    ? {
        position: "sticky",
        top: theme.spacing(8.25),
        paddingRight: theme.spacing(2),
        maxHeight: "calc(100vh - 103px)",
      }
    : {}),
}));

const PortfolioDetailMenu = forwardRef(
  (
    {
      portfolioDetail,
      display,
      headers,
      isMobile = false,
    }: PortfolioDetailMenuProps,
    ref
  ) => (
    <AnchorWrapper display={display} ref={ref}>
      {!isMobile && (
        <Button
          className="justify-around"
          fullWidth
          href={`/portfolio?selectedProject=${portfolioDetail.id}`}
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          Back to Portfolio
        </Button>
      )}
      <Typography className="mt-2" component="h3" variant="h5">
        Overview
      </Typography>
      <List className="pt-0 min-w-fit">
        <ListItem>
          <AnchorLink href="#detail">Portfolio Detail</AnchorLink>
        </ListItem>
        {headers.map((header) =>
          portfolioDetail[header] ? (
            <ListItem key={header}>
              <AnchorLink href={`#${header}`}>
                {toSentenceCase(header)}
              </AnchorLink>
            </ListItem>
          ) : null
        )}
      </List>
    </AnchorWrapper>
  )
);

export default PortfolioDetailMenu;
