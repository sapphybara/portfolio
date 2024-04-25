import { useMemo } from "react";
import {
  type Theme,
  Typography,
  darken,
  lighten,
  styled,
  Grid,
  Box,
  useTheme,
  Paper,
} from "@mui/material";
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

type levels = 1 | 2 | 3 | 4;

const levels: levels[] = [1, 2, 3, 4];
const levelColors: Record<levels, "success" | "info" | "warning" | "error"> = {
  1: "success",
  2: "info",
  3: "warning",
  4: "error",
};

const generateLevelStyles = (level: levels, theme: Theme) => {
  const color = theme.palette[levelColors[level]].main;
  const { mode } = theme.palette;
  const content = level === 3 ? "⚠️" : level === 4 ? "❌" : undefined;

  return {
    [`& .level-${level} .score`]: {
      backgroundColor: getBackgroundColor(color, mode),
      "&:hover": {
        backgroundColor: getHoverBackgroundColor(color, mode),
      },
      "&.Mui-selected": {
        backgroundColor: getSelectedBackgroundColor(color, mode),
        "&:hover": {
          backgroundColor: getSelectedHoverBackgroundColor(color, mode),
        },
      },
      ...(content && {
        "&::before": {
          content: `"${content}"`,
          position: "absolute",
          left: theme.spacing(0.5),
        },
      }),
    },
  };
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  ...levels.reduce(
    (acc, level) => ({
      ...acc,
      ...generateLevelStyles(level, theme),
    }),
    {}
  ),
}));

const CreditCardTable = ({
  creditCards,
  loading,
}: {
  creditCards: CreditCard[] | CreateCreditCardInput[];
  loading: boolean;
}) => {
  const theme = useTheme();

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
    <>
      <Paper className="mb-2 p-2">
        <Typography component="h3" variant="h6" className="mb-4">
          Score Key
        </Typography>
        <Grid container spacing={2}>
          {levels.map((level) => (
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              key={level}
              gap={1}
            >
              <Box
                bgcolor={theme.palette[levelColors[level]].main}
                className={`level-${level} score`}
                sx={{ width: 20, height: 20 }}
              />
              <Typography variant="body2">{levelColors[level]}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <StyledDataGrid
        autoHeight
        columns={columns}
        rows={creditCards}
        initialState={{
          sorting: { sortModel: [{ field: "score", sort: "desc" }] },
        }}
        getCellClassName={({ field }) => {
          if (field === "score") {
            // make the component have relative positioning so
            //  the ::before pseudo-element can be positioned absolutely
            return "relative score";
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
      />
    </>
  );
};

export default CreditCardTable;
