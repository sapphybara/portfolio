import { useMemo } from "react";
import { Typography, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { CreateCreditCardInput, CreditCard } from "src/API";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
  formatFinancialNumber,
} from "@utils/utils";
import StyledDataGrid from "./StyledDataGrid";
import ScoreKey from "./ScoreKey";
import EditToolbar from "./EditToolbar";
import { CCScoreLevel } from "types/global";

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

const levels: CCScoreLevel[] = [1, 2, 3, 4];
const levelColors: Record<
  CCScoreLevel,
  { color: "success" | "info" | "warning" | "error"; label: string }
> = {
  1: { color: "success", label: "low priority" },
  2: { color: "info", label: "mid priority" },
  3: { color: "warning", label: "high priority" },
  4: { color: "error", label: "max priority" },
};

interface CreditCardTableProps {
  creditCards: CreditCard[] | CreateCreditCardInput[];
}

const CreditCardTable = ({ creditCards }: CreditCardTableProps) => {
  const columns = useMemo(() => {
    return creditCardKeys.map((key) => ({
      editable: true,
      field: key,
      headerName: toSentenceCase(key),
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
          return toSentenceCase(key);
        }
      },
      valueFormatter: (value?: boolean | number | string | Date) => {
        const type = creditCardTypeMapping[key];
        if (!value) {
          return "";
        }

        if (key === "apr") {
          return formatFinancialNumber(value as number, "percent");
        } else if (key === "score") {
          return formatFinancialNumber(value as number, "plain");
        }

        if (type === "number") {
          return formatFinancialNumber(value as number, "dollar");
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

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5">
          Credit Cards
        </Typography>
        <ScoreKey levels={levels} levelColors={levelColors} />
      </Stack>
      <StyledDataGrid
        autoHeight
        columns={columns}
        levelColors={levelColors}
        levels={levels}
        rows={creditCards}
        initialState={{
          sorting: { sortModel: [{ field: "score", sort: "desc" }] },
        }}
        getCellClassName={({ field }) => {
          if (field === "score") {
            return "score";
          }
          return "";
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
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </>
  );
};

export default CreditCardTable;
