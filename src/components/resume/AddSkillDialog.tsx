import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import { AutoCompleteOption } from "types/global";

interface AddSkillDialogProps {
  dialogValue: AutoCompleteOption;
  setDialogValue: (value: AutoCompleteOption) => void;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
}

const AddSkillDialog: FC<AddSkillDialogProps> = ({
  dialogValue,
  setDialogValue,
  handleClose,
  handleSubmit,
  open,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <form onSubmit={handleSubmit}>
      <DialogTitle>Add a new skill</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={dialogValue.section}
          onChange={(event) => {
            const { value: section } = event.target;
            setDialogValue({
              ...dialogValue,
              section,
            });
          }}
          label="section"
          type="text"
          variant="standard"
        />
        <TextField
          margin="dense"
          id="name"
          value={dialogValue.label}
          onChange={(event) =>
            setDialogValue({
              ...dialogValue,
              label: event.target.value,
            })
          }
          label="skill"
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default AddSkillDialog;
