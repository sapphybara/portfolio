import { CreateCreditCardInput } from "@/API";
import {
  PortfolioItemImage,
  ResumeDataItem,
  Role,
  TechStack,
} from "types/global";
import { creditCardKeys, creditCardTypeMapping, roles } from "./utils";

export const isCreditCard = (card?: unknown): card is CreateCreditCardInput => {
  if (!card || typeof card !== "object" || card === null) {
    return false;
  }

  const cardAsRecord = card as {
    [K in keyof CreateCreditCardInput]: string | boolean;
  };

  return creditCardKeys.every((key) => {
    const value = cardAsRecord[key];
    const type = creditCardTypeMapping[key];

    if (key === "score") {
      return true;
    } else if (key === "owner") {
      return ["SAPPHY", "HEIDI"].includes(value as string);
    }

    if (
      value === undefined ||
      (typeof value === "string" && value.length === 0)
    ) {
      return false;
    }

    switch (type) {
      case "date":
        return !isNaN(new Date(value as string).getTime());
      case "number":
        return !isNaN(Number(value));
      case "text":
        return typeof value === "string";
      case "boolean":
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

export const isRole = (role: unknown): role is Role => {
  return typeof role === "string" && roles.includes(role as Role);
};

export const isPortfolioImage = (image: unknown): image is PortfolioItemImage =>
  typeof image === "object" &&
  image !== null &&
  "src" in image &&
  typeof image.src === "string" &&
  "alt" in image &&
  typeof image.alt === "string";

export const isResumeDataItem = (item: unknown): item is ResumeDataItem =>
  typeof item === "object" &&
  item !== null &&
  "title" in item &&
  (!("data" in item) ||
    (Array.isArray(item.data) &&
      item.data.every(
        (dataItem: unknown) =>
          typeof dataItem === "string" || isResumeDataItem(dataItem)
      )));
