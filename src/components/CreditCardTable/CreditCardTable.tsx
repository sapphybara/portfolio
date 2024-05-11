import { useCallback, useMemo, useState } from "react";
import {
  Typography,
  Stack,
  AlertProps,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId as GridRowIdType,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { Save, Cancel, Edit, DeleteOutlineOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { generateClient } from "aws-amplify/api";

import { CreateCreditCardInput, CreditCard } from "@/API";
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
import { deleteCreditCard, updateCreditCard } from "@graphql/mutations";

type GridRowId = Extract<GridRowIdType, string>;

const client = generateClient();

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

const GridActionsCellItemPrimary = styled(GridActionsCellItem)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },
}));
GridActionsCellItemPrimary.displayName = "GridActionsCellItemPrimary";

interface CreditCardTableProps {
  creditCards: CreditCard[] | CreateCreditCardInput[];
}

const CreditCardTable = ({ creditCards }: CreditCardTableProps) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      client.graphql({
        query: deleteCreditCard,
        variables: { input: { id } },
      });
    } catch (error) {
      console.error("Error deleting credit card", error);
    }
  };

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel]
  );

  const processRowUpdate = async (newRow: GridRowModel) => {
    delete newRow.score;
    delete newRow.createdAt;
    delete newRow.updatedAt;
    delete newRow.__typename;
    newRow.paymentDate = dayjs(newRow.paymentDate).format("YYYY-MM-DD");

    const updatedRow = await client.graphql({
      query: updateCreditCard,
      variables: { input: { ...newRow, id: newRow.id } },
    });
    return updatedRow.data.updateCreditCard;
  };

  const handleProcessRowUpdateError = useCallback(
    (error: Error | { errors: Error[] }) => {
      let message;
      if ("errors" in error) {
        message = error.errors.map((e) => e.message).join(",\n");
      } else {
        message = error.message;
      }
      setSnackbar({ children: message, severity: "error" });
    },
    []
  );

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = useMemo(() => {
    return [
      ...creditCardKeys.map((key) => ({
        editable: key !== "score",
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
        valueGetter: (
          value: CreateCreditCardInput[keyof CreateCreditCardInput]
        ) => {
          if (!value) {
            return value;
          }
          if (key === "paymentDate") {
            return new Date(value as string);
          }
          return value;
        },
        width: key === "id" ? 150 : columnWidths[key],
      })),
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        getActions: ({ id }: { id: GridRowId }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                color="primary"
                icon={<Save />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItemPrimary
                icon={<Cancel />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />,
            ];
          }

          return [
            <GridActionsCellItemPrimary
              icon={<Edit />}
              label="Edit"
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItemPrimary
              icon={<DeleteOutlineOutlined />}
              label="Delete"
              onClick={handleDeleteClick(id)}
            />,
          ];
        },
      },
    ] as GridColDef[];
  }, [handleCancelClick, handleEditClick, handleSaveClick, rowModesModel]);

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
        editMode="row"
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
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        processRowUpdate={processRowUpdate}
        rowModesModel={rowModesModel}
        slots={{
          toolbar: EditToolbar,
        }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};

export default CreditCardTable;
