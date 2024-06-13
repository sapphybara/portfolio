import { useCallback, useMemo, useState } from "react";
import { useAsyncValue } from "react-router-dom";
import {
  AlertProps,
  Snackbar,
  Alert,
  styled,
  useTheme,
  useMediaQuery,
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
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Save, Cancel, Edit, DeleteOutlineOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { generateClient } from "aws-amplify/api";

import { CreateCreditCardInput, ListCreditCardsQuery } from "@/API";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
  formatFinancialNumber,
} from "@utils/utils";
import StyledDataGrid from "./StyledDataGrid";
import EditToolbar from "./EditToolbar";
import { deleteCreditCard, updateCreditCard } from "@graphql/mutations";
import TableHeader from "./TableHeader";

type GridRowId = Extract<GridRowIdType, string>;

const client = generateClient();

const GridActionsCellItemPrimary = styled(GridActionsCellItem)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.primary,
  },
}));
GridActionsCellItemPrimary.displayName = "GridActionsCellItemPrimary";

const CreditCardTable = () => {
  const creditCards = useAsyncValue() as { data: ListCreditCardsQuery };
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

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
    const columnsToHideOnMobile = [
      "apr",
      "paymentDate",
      "minimumPayment",
      "isEarningInterest",
      "lastInterestAmount",
    ];

    return [
      ...creditCardKeys
        .filter((key) => !(isSmDown && columnsToHideOnMobile.includes(key)))
        .map((key) => ({
          editable: key !== "score",
          field: key,
          headerName: toSentenceCase(key),
          hideable: key !== "cardName",
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
            if (value == null) {
              // loose equality checks for undefined too
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
        })),
      ...(isSmDown
        ? []
        : [
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              getActions: ({ id }: { id: GridRowId }) => {
                const isInEditMode =
                  rowModesModel[id]?.mode === GridRowModes.Edit;

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
          ]),
    ] as GridColDef[];
  }, [
    handleCancelClick,
    handleEditClick,
    handleSaveClick,
    isSmDown,
    rowModesModel,
  ]);

  return (
    <>
      <TableHeader />
      <StyledDataGrid
        autoHeight
        autosizeOnMount
        columns={columns}
        rows={(creditCards.data.listCreditCards?.items || []).map(
          (item) => item as GridValidRowModel
        )}
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
