import dayjs from "dayjs";
import { CreateCreditCardInput } from "@/API";
import { creditCardTypeMapping, formatFinancialNumber } from "@utils/utils";
import { AlertProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { GridRowModel, GridValidRowModel } from "@mui/x-data-grid";
import { generateClient } from "aws-amplify/api";
import { updateCreditCard } from "@graphql/mutations";

const client = generateClient();

export const formatValue = (
  key: keyof CreateCreditCardInput,
  value?: boolean | number | string | Date,
  params?: CreateCreditCardInput
) => {
  const type = creditCardTypeMapping[key];
  if (value == null) return "";

  if (key === "apr") return formatFinancialNumber(value as number, "percent");
  if (key === "score") return formatFinancialNumber(value as number, "plain");
  if (key === "balance") {
    const balance = params!.balance;
    const creditLimit = params!.creditLimit;
    return `${formatFinancialNumber(
      balance,
      "dollar"
    )} (${formatFinancialNumber((balance / creditLimit) * 100, "percent")})`;
  }

  if (type === "number")
    return formatFinancialNumber(value as number, "dollar");
  if (type === "date") return dayjs(value as Date).format("D");

  return value;
};

export const processRowUpdate = async (
  newRow: GridRowModel,
  oldRow: GridRowModel,
  setSnackbar: Dispatch<
    SetStateAction<Pick<AlertProps, "children" | "severity"> | null>
  >,
  revalidate: () => void
): Promise<GridValidRowModel> => {
  delete newRow.score;
  delete newRow.createdAt;
  delete newRow.updatedAt;
  delete newRow.__typename;
  newRow.paymentDate = dayjs(newRow.paymentDate).format("YYYY-MM-DD");
  if (!newRow.owner) {
    setSnackbar({ children: "Owner is required", severity: "error" });
    return oldRow;
  }
  newRow.owner = newRow.owner.toUpperCase();

  try {
    const updatedRow = await client.graphql({
      query: updateCreditCard,
      variables: { input: { ...newRow, id: newRow.id } },
    });
    revalidate();

    const { updateCreditCard: modifiedCreditCard } = updatedRow.data;
    return modifiedCreditCard;
  } catch (err) {
    setSnackbar({ children: (err as Error).message, severity: "error" });
    return oldRow;
  }
};
