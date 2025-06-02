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

interface AnchorWrapperProps extends BoxProps {
  isMobile?: boolean;
}

interface PortfolioDetailMenuProps {
  headers: (keyof PortfolioItem)[];
  portfolioDetail: PortfolioItem;
  display?: BoxProps["display"];
  isMobile?: boolean;
}

const AnchorLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AnchorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<AnchorWrapperProps>(({ isMobile, theme }) => ({
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
        // todo this height is only for the desktop view, should be adjusted for mobile
        ...(isMobile ? {} : { height: "calc(100vh - 103px)" }),
        paddingRight: theme.spacing(2),
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
    <AnchorWrapper display={display} isMobile={isMobile} ref={ref}>
      {!isMobile && (
        <Button
          className="justify-around"
          fullWidth
          href="/portfolio"
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
