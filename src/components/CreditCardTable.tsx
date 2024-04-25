import { useMemo } from "react";
import { Typography, darken, lighten, styled } from "@mui/material";
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
  cardName: 132,
  score: 82,
  apr: 82,
  balance: 107,
  isEarningInterest: 82,
  lastInterestAmount: 125,
  paymentDate: 100,
  minimumPayment: 121,
};

const getBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .level-2": {
    backgroundColor: getBackgroundColor(
      theme.palette.grey[300],
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.grey[300],
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.grey[300],
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.grey[300],
          theme.palette.mode
        ),
      },
    },
  },
  "& .level-3": {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
      },
    },
  },
  "& .level-4": {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
    },
  },
}));

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
        } else if (key === "lastInterestAmount") {
          return "Last Interest Amt.";
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
    <StyledDataGrid
      autoHeight
      columns={columns}
      rows={creditCards}
      initialState={{
        sorting: { sortModel: [{ field: "score", sort: "desc" }] },
      }}
      getRowClassName={({ row: { score } }) => {
        if (score < 0.3) {
          return "level-1";
        } else if (score < 0.6) {
          return "level-2";
        } else if (score < 0.8) {
          return "level-3";
        }
        return "level-4";
      }}
    />
  );
};

export default CreditCardTable;
