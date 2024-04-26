import { CreateCreditCardInput } from "src/API";
import portfolioCards from "@routes/portfolio/portfolio_cards.json";
import { TechStack } from "types/global";

export const camelToSentenceCase = (str: string) => {
  if (!str) {
    return "";
  }
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const creditCardTypeMapping: {
  [K in keyof CreateCreditCardInput]: "boolean" | "date" | "number" | "text";
} = {
  cardName: "text",
  score: "number",
  apr: "number",
  balance: "number",
  isEarningInterest: "boolean",
  lastInterestAmount: "number",
  paymentDate: "date",
  minimumPayment: "number",
};
export const creditCardKeys = Object.keys(
  creditCardTypeMapping
) as (keyof CreateCreditCardInput)[];

export const isCompleteCreditCard = (
  card?: Partial<CreateCreditCardInput>
): card is CreateCreditCardInput => {
  if (!card) {
    return false;
  }

  return creditCardKeys.every((key) => {
    if (key === "score") {
      return true;
    }

    const value = card[key];
    const type = creditCardTypeMapping[key];

    if (value === undefined) {
      return false;
    }

    switch (type) {
      case "date":
        return !isNaN(new Date(value as string).getTime());
      case "number":
        return !isNaN(Number(value));
      case "text":
        return typeof value === "string";
      default:
        return typeof value === type;
    }
  });
};

export const getPortfolioDetail = ({
  params,
}: {
  params: { projectId: string };
}) => {
  const { projectId } = params;
  return portfolioCards.find((card) => card.id === projectId) ?? null;
};

export const isTechStack = (obj: unknown): obj is TechStack =>
  typeof obj === "object" &&
  obj !== null &&
  "name" in obj &&
  typeof (obj as { name: unknown }).name === "string" &&
  "cardType" in obj &&
  typeof (obj as { cardType: unknown }).cardType === "string";

export const formatFinancialNumber = (
  value: number,
  isDollars = true,
  isPercent = false
) => {
  const formattedValue =
    Math.abs(value) >= 10000
      ? value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : value.toFixed(2);

  if (isPercent) {
    return `${formattedValue}%`;
  }
  if (isDollars) {
    return `$${formattedValue}`;
  }
  return formattedValue;
};
