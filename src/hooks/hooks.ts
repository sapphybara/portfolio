import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listCreditCards } from "src/graphql/queries";
import { Client } from "aws-amplify/api";
import { CreateCreditCardInput, CreditCard } from "src/API";
import { AuthContext } from "src/context/AuthProvider";

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
