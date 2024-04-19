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
  apr: "number",
  balance: "number",
  cardName: "text",
  isEarningInterest: "boolean",
  lastInterestAmount: "number",
  minimumPayment: "number",
  paymentDate: "date",
  score: "number",
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
