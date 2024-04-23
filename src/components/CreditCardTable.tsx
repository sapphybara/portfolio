import { useMemo } from "react";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { CreateCreditCardInput, CreditCard } from "src/API";
import {
  camelToSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
} from "src/utils/utils";

const columnWidths: Record<
  Exclude<keyof CreateCreditCardInput, "id">,
  number
> = {
  cardName: 125,
  score: 75,
  apr: 75,
  balance: 100,
  isEarningInterest: 75,
  lastInterestAmount: 100,
  paymentDate: 100,
  minimumPayment: 125,
};

const CreditCardTable = ({
  creditCards,
  loading,
}: {
  creditCards: CreditCard[] | CreateCreditCardInput[];
  loading: boolean;
}) => {
  const formatNumber = (value: number, isDollars = true) => {
    const formattedValue =
      Math.abs(value) >= 10000
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : value.toFixed(2);

    return isDollars ? `$${formattedValue}` : formattedValue;
  };

  const columns = useMemo(() => {
    return creditCardKeys.map((key) => ({
      field: key,
      headerName: camelToSentenceCase(key),
      type:
        creditCardTypeMapping[key] !== "text"
          ? creditCardTypeMapping[key]
          : "string",
      renderHeader: () => {
        if (key === "isEarningInterest") {
          return "Interest?";
        } else if (key === "score") {
          return <strong>Score</strong>;
        } else if (key === "minimumPayment") {
          return "Min. Payment";
        } else {
          return camelToSentenceCase(key);
        }
      },
      valueFormatter: (value?: boolean | number | string | Date) => {
        const type = creditCardTypeMapping[key];
        if (!value) {
          return "";
        }

        if (key === "apr") {
          return `${value}%`;
        } else if (key === "score") {
          return formatNumber(value as number, false);
        }

        if (type === "number") {
          return formatNumber(value as number);
        } else if (type === "date") {
          return dayjs(value as Date).format("D");
        }

        return value;
      },
      valueGetter: (value) => {
        if (key === "paymentDate") {
          return new Date(value);
        }
        return value;
      },
      width: key === "id" ? 150 : columnWidths[key],
    })) as GridColDef[];
  }, []);

  if (loading) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={creditCards}
      initialState={{
        sorting: { sortModel: [{ field: "score", sort: "desc" }] },
      }}
    />
  );
};

export default CreditCardTable;
