import { Box, Link, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { ReactNode } from "react";
import Navbar from "@components/navbar/Navbar";

const ErrorPage: (props: PropsWithRoutes) => ReactNode = ({ routes }) => {
  const error = useRouteError() as { statusText?: string } | Error;
  console.error(error);
  const isError = error instanceof Error;
  if (
    isError &&
    error.message ===
      "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
  ) {
    console.log("matched null condition");
    return null;
  }

  return (
    <>
      <Navbar routes={routes} />
      <Box className="mt-16 mx-8" component="main">
        <Typography variant="decoration">Error</Typography>
        <Typography variant="h1">Oops!</Typography>
        <Typography className="text-center" paragraph>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography className="text-center" paragraph>
          <i>{isError ? error.message : error.statusText}</i>
        </Typography>
        <Typography className="text-center" paragraph>
          Please click <Link href="/">here</Link> to return to the home page.
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
