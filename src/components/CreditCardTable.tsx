import { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CreateCreditCardInput, CreditCard } from "src/API";
import {
  camelToSentenceCase,
  creditCardKeys,
  creditCardTypeMapping,
} from "src/utils/utils";

const CreditCardTable = ({
  creditCards,
}: {
  creditCards: CreditCard[] | CreateCreditCardInput[];
}) => {
  const columns = useMemo(() => {
    return creditCardKeys.map((key, i) => ({
      field: key,
      headerName: camelToSentenceCase(key),
      type:
        creditCardTypeMapping[key] !== "text"
          ? creditCardTypeMapping[key]
          : "string",
      renderHeader: () => {
        if (key === "isEarningInterest") {
          return "Earning Interest";
        } else if (key === "apr") {
          return "APR (%)";
        } else {
          return camelToSentenceCase(key);
        }
      },
      valueGetter: (value) => {
        if (key === "paymentDate") {
          return new Date(value);
        }
        return value;
      },
      width:
        i === 0 ? 75 : i < 3 || i === creditCardKeys.length - 1 ? 100 : 150,
    })) as GridColDef[];
  }, []);

  return <DataGrid autoHeight columns={columns} rows={creditCards} />;
};

export default CreditCardTable;
