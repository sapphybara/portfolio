import { Button, styled } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";

const AddCreditCardBtn = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  "& .MuiButton-startIcon .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
}));

const EditToolbar = () => {
  return (
    <GridToolbarContainer>
      <AddCreditCardBtn href="/admin/credit-cards/new" startIcon={<Add />}>
        Add Credit Card
      </AddCreditCardBtn>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
