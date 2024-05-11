import { useCallback, useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import { listCreditCards } from "@graphql/queries";
import { Client } from "aws-amplify/api";
import { CreateCreditCardInput, CreditCard } from "@/API";
import { PropsWithUser } from "types/global";

export const useTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const readablePathname = pathname.split("/")[1];
    const titleSuffix =
      readablePathname === ""
        ? ""
        : ` | ${readablePathname
            .charAt(0)
            .toUpperCase()}${readablePathname.slice(1)}`;

    document.title = `Sapphyra Wiser${titleSuffix}`;
  }, [pathname]);
};

export const useFetchCreditCards = (client: Client) => {
  const [creditCards, setCreditCards] = useState<
    CreditCard[] | CreateCreditCardInput[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { user } = useRouteLoaderData("root") as PropsWithUser;

  const fetchCreditCards = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const ccData = await client.graphql({
        query: listCreditCards,
      });
      setCreditCards(ccData.data.listCreditCards.items);
    } catch (err) {
      console.error("error fetching credit cards", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [client, user]);

  useEffect(() => {
    fetchCreditCards();
  }, [client, fetchCreditCards]);

  return { creditCards, error, fetchCreditCards, loading };
};
