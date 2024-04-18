import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listCreditCards } from "src/graphql/queries";
import { Client } from "aws-amplify/api";
import { CreateCreditCardInput, CreditCard } from "src/API";

export const useTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const titleSuffix =
      pathname === "/"
        ? ""
        : ` | ${pathname.charAt(1).toUpperCase()}${pathname.slice(2)}`;

    document.title = `Sapphyra Wiser${titleSuffix}`;
  }, [pathname]);
};

export const useFetchCreditCards = (client: Client) => {
  const [creditCards, setCreditCards] = useState<
    CreditCard[] | CreateCreditCardInput[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchCreditCards = useCallback(async () => {
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
  }, [client]);

  useEffect(() => {
    fetchCreditCards();
  }, [client, fetchCreditCards]);

  return { creditCards, error, fetchCreditCards, loading };
};
