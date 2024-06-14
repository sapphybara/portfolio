import { CreateCreditCardInput } from "@/API";

export const toSentenceCase = (str: string) => {
  if (!str) {
    return "";
  }
  const result = str
    .replace(/([A-Z])/g, " $1") // convert camelCase
    .replace(/-/g, " ") // convert kebab-case
    .replace(/_/g, " "); // convert snake_case
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const creditCardTypeMapping: {
  [K in keyof CreateCreditCardInput]: "boolean" | "date" | "number" | "text";
} = {
  cardName: "text",
  creditLimit: "number",
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

export const formatFinancialNumber = (
  value: number,
  formatType: "dollar" | "percent" | "plain"
) => {
  const formattedValue =
    value - 0 < 1e-6
      ? 0
      : Math.abs(value) >= 10000
      ? value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : value.toFixed(2);

  switch (formatType) {
    case "dollar":
      return `$${formattedValue}`;
    case "percent":
      return `${formattedValue}%`;
    case "plain":
    default:
      return formattedValue;
  }
};
