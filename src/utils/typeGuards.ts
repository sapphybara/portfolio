import { CreateCreditCardInput } from "src/API";
import { PortfolioItemImage, Roles, TechStack } from "types/global";
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
  typeof obj.name === "string" &&
  "cardType" in obj &&
  typeof obj.cardType === "string";

export const isRole = (role: unknown): role is Roles => {
  return (
    typeof role === "string" &&
    ["developer", "designer", "researcher"].includes(role.toLowerCase())
  );
};

export const isPortfolioImage = (image: unknown): image is PortfolioItemImage =>
  typeof image === "object" &&
  image !== null &&
  "src" in image &&
  typeof image.src === "string" &&
  "alt" in image &&
  typeof image.alt === "string";
