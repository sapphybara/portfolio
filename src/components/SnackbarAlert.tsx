import { Alert, AlertProps, Snackbar } from "@mui/material";
import { SyntheticEvent } from "react";

interface SnackbarAlertProps {
  snackbar: Pick<AlertProps, "children" | "severity"> | null;
  handleCloseSnackbar: (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => void;
}

const SnackbarAlert = ({
  snackbar,
  handleCloseSnackbar,
}: SnackbarAlertProps) => {
  return snackbar ? (
    <Snackbar
      open
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleCloseSnackbar}
      autoHideDuration={10000}
    >
      <Alert {...snackbar} onClose={handleCloseSnackbar} />
    </Snackbar>
  ) : null;
};

export default SnackbarAlert;
