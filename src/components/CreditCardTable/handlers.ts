import { deleteCreditCard } from "@graphql/mutations";
import { AlertProps } from "@mui/material";
import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { generateClient } from "aws-amplify/api";
import { MutableRefObject, useCallback } from "react";

const client = generateClient();

export const useHandlers = (
  rowModesModel: GridRowModesModel,
  setRowModesModel: (model: GridRowModesModel) => void,
  setSnackbar: (
    snackbar: Pick<AlertProps, "children" | "severity"> | null
  ) => void
) => {
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
    [rowModesModel, setRowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel, setRowModesModel]
  );

  const handleDeleteClick =
    (id: string, apiRef: MutableRefObject<GridApiCommunity>) => async () => {
      try {
        await client.graphql({
          query: deleteCreditCard,
          variables: { input: { id } },
        });
        apiRef.current.updateRows([{ id, _action: "delete" }]);
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
    [rowModesModel, setRowModesModel]
  );

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
    [setSnackbar]
  );

  return {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
    handleRowEditStop,
    handleProcessRowUpdateError,
  };
};
