import { Box, Link, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { ReactNode } from "react";
import Navbar from "@components/Navbar";

const Error: (props: PropsWithRoutes) => ReactNode = ({ routes }) => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar routes={routes} />
      <Box className="mt-16 mx-8" component="main">
        <Typography variant="decoration">Error</Typography>
        <Typography className="decorated" variant="h1">
          Oops!
        </Typography>
        <Typography className="text-center" paragraph>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography className="text-center" paragraph>
          <i>
            {(error as { statusText?: string }).statusText ||
              (error as Error).message}
          </i>
        </Typography>
        <Typography className="text-center" paragraph>
          Please click <Link href="/">here</Link> to return to the home page.
        </Typography>
      </Box>
    </>
  );
};

export default Error;
