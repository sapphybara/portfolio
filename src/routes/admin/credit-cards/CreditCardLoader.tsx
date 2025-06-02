import { Suspense } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Await, Outlet, useFetcher, useLoaderData } from "react-router-dom";

import CreditCardTable from "@components/CreditCardTable/CreditCardTable";
import { ListCreditCardsQuery } from "@/API";
import Fallback from "@components/CreditCardTable/Fallback";
import { LoaderActionError } from "types/global";
import DecoratedHeader from "@/components/DecoratedHeader";

const CreditCardLoader = () => {
  const fetcher = useFetcher();
  const creditCardData = useLoaderData() as
    | {
        creditCards: Promise<{ data: ListCreditCardsQuery }>;
      }
    | LoaderActionError;

  return (
    <Box>
      <Outlet />
      <DecoratedHeader decoration="view" header="Credit Cards" level={1} />
      {"creditCards" in creditCardData ? (
        <>
          <Suspense fallback={<Fallback />}>
            <Await resolve={creditCardData.creditCards}>
              <CreditCardTable />
            </Await>
          </Suspense>
          <fetcher.Form method="post" action="/logout">
            <Button
              className="my-2"
              color="warning"
              type="submit"
              variant="contained"
            >
              Sign Out
            </Button>
          </fetcher.Form>
        </>
      ) : "status" in creditCardData ? (
        <Box>
          <Typography color="error" paragraph>
            {creditCardData.status}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default CreditCardLoader;
