import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAsyncValue, useRevalidator } from "react-router-dom";
import { AlertProps, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowId as GridRowIdType,
  GridRowModes,
  GridRowModesModel,
  GridValidRowModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Save, Cancel, Edit, DeleteOutlineOutlined } from "@mui/icons-material";

import { CreateCreditCardInput, ListCreditCardsQuery } from "@/API";
import {
  toSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
} from "@utils/utils";
import { GridActionsCellItemPrimary, StyledDataGrid } from "./styled";
import EditToolbar from "./EditToolbar";
import TableHeader from "./TableHeader";
import CreditCardOwnerAutocomplete from "@components/CreditCardOwnerAutocomplete";
import SnackbarAlert from "@components/SnackbarAlert";
import { formatValue, processRowUpdate } from "./utils";
import { useHandlers } from "./handlers";

type GridRowId = Extract<GridRowIdType, string>;

const CreditCardTable = () => {
  const creditCards = useAsyncValue() as { data: ListCreditCardsQuery };
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const apiRef = useGridApiRef();
  const revalidator = useRevalidator();

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const createColumnVisibilityModel = useCallback(
    () =>
      Object.fromEntries(
        [
          "actions",
          "apr",
          "creditLimit",
          "paymentDate",
          "minimumPayment",
          "isEarningInterest",
          "owner",
          "lastInterestAmount",
        ].map((field) => [field, !(field === "lastInterestAmount" || isSmDown)])
      ),
    [isSmDown]
  );

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    createColumnVisibilityModel()
  );

  useEffect(() => {
    setColumnVisibilityModel(createColumnVisibilityModel());
    apiRef.current.autosizeColumns();
  }, [apiRef, createColumnVisibilityModel, isSmDown]);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleChange = useCallback(
    (id: string, field: string) =>
      async (_e: SyntheticEvent, value: string | null) => {
        await apiRef.current.setEditCellValue({
          id,
          field,
          value,
        });
      },
    [apiRef]
  );

  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
    handleRowEditStop,
    handleProcessRowUpdateError,
  } = useHandlers(rowModesModel, setRowModesModel, setSnackbar);

  const columns = useMemo(
    () =>
      [
        ...creditCardKeys.map((key) => ({
          editable: key !== "score",
          field: key,
          headerName: toSentenceCase(key),
          hideable: key !== "cardName",
          type:
            creditCardTypeMapping[key] !== "text"
              ? creditCardTypeMapping[key]
              : "string",
          ...(key === "owner" && {
            renderEditCell: (
              params: GridRenderEditCellParams<CreateCreditCardInput>
            ) => (
              <CreditCardOwnerAutocomplete
                id={key}
                onChange={handleChange(params.id as string, params.field)}
                value={
                  !params.row.owner
                    ? "Sapphy"
                    : params.row.owner.slice(0, 1).toUpperCase() +
                      params.row.owner.slice(1).toLowerCase()
                }
              />
            ),
            renderCell: ({
              row: { owner },
            }: GridRenderCellParams<CreateCreditCardInput>) => (
              <Tooltip
                title={owner.toString() === "SAPPHY" ? "Sapphy" : "Heidi"}
              >
                <div>{owner[0]}</div>
              </Tooltip>
            ),
          }),
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
          valueFormatter: (
            value?: boolean | number | string | Date,
            params?: CreateCreditCardInput
          ) => formatValue(key, value, params),
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
        {
          field: "actions",
          type: "actions",
          headerName: "Actions",
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
                onClick={handleDeleteClick(id, apiRef)}
              />,
            ];
          },
        },
      ] as GridColDef[],
    [
      apiRef,
      handleCancelClick,
      handleChange,
      handleDeleteClick,
      handleEditClick,
      handleSaveClick,
      rowModesModel,
    ]
  );

  return (
    <>
      <TableHeader />
      <StyledDataGrid
        autoHeight
        autosizeOnMount
        apiRef={apiRef}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
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
          if (score < 0.2) {
            return "level-1";
          } else if (score < 0.45) {
            return "level-2";
          } else if (score < 0.6) {
            return "level-3";
          }
          return "level-4";
        }}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        processRowUpdate={(newRow, oldRow) =>
          processRowUpdate(newRow, oldRow, setSnackbar, revalidator.revalidate)
        }
        rowModesModel={rowModesModel}
        slots={{
          toolbar: EditToolbar,
        }}
      />
      <SnackbarAlert
        handleCloseSnackbar={handleCloseSnackbar}
        snackbar={snackbar}
      />
    </>
  );
};

export default CreditCardTable;
