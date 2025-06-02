import { NavigateNext } from "@mui/icons-material";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  styled,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { PortfolioItem } from "types/global";
import { useState } from "react";
import PortfolioDetailPaper from "@components/portfolio/detail/PortfolioDetailPaper";

const BreadcrumbsWidthCustomSeparator = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    margin: theme.spacing(0, 0.5),
  },
}));

const DetailedTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(-0.96),
})) as typeof Typography;

const PortfolioDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const portfolioDetail = useLoaderData() as PortfolioItem;
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const shouldShowMobileMenu = isMdDown && isMenuOpen;

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
      <BreadcrumbsWidthCustomSeparator
        aria-label="breadcrumb"
        separator={<NavigateNext color="secondary" fontSize="small" />}
      >
        <Typography
          component={Link}
          href="/portfolio"
          underline="hover"
          variant="decoration"
        >
          Portfolio
        </Typography>
        <Typography variant="decoration">Portfolio Detail</Typography>
      </BreadcrumbsWidthCustomSeparator>
      <DetailedTitle component="h1" variant="h2">
        {portfolioDetail.title}
      </DetailedTitle>
      <Stack className="mt-4" direction={isSmUp ? "row" : "column"}>
        <PortfolioDetailPaper
          toggleMenu={toggleMenu}
          portfolioDetail={portfolioDetail}
          isMenuOpen={shouldShowMobileMenu}
        />
      </Stack>
    </>
  );
};

export default PortfolioDetail;
