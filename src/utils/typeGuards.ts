import { CreateCreditCardInput } from "src/API";
import { Roles, TechStack } from "types/global";
import { creditCardKeys, creditCardTypeMapping } from "./utils";

export const isCreditCard = (
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

export const isTechStack = (obj: unknown): obj is TechStack =>
  typeof obj === "object" &&
  obj !== null &&
  "name" in obj &&
  typeof (obj as { name: unknown }).name === "string" &&
  "cardType" in obj &&
  typeof (obj as { cardType: unknown }).cardType === "string";

export const isRole = (role: unknown): role is Roles => {
  return (
    typeof role === "string" &&
    ["developer", "designer"].includes(role.toLowerCase())
  );
};
