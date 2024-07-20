import { Box, Link, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { ReactNode } from "react";
import Navbar from "@components/navbar/Navbar";

const ErrorPage: (props: PropsWithRoutes) => ReactNode = ({ routes }) => {
  const error = useRouteError() as { statusText?: string } | Error;
  console.error(error);
  const isError = error instanceof Error;

  const message = isError ? error.message : error.statusText;

  if (
    isError &&
    (message ===
      "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node." ||
      message ===
        "Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.")
  ) {
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
          <i>{message}</i>
        </Typography>
        <Typography className="text-center" paragraph>
          Please click <Link href="/">here</Link> to return to the home page.
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
