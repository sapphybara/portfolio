import { Button, Stack } from "@mui/material";
import DecoratedHeader from "@components/DecoratedHeader";
import { DecoratedHeaderProps } from "types/global";

interface HeaderWithButtonProps {
  btnTitle: string;
  href: string;
  headerData: DecoratedHeaderProps;
}

const HeaderWithButton = ({
  href,
  btnTitle,
  headerData,
}: HeaderWithButtonProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
    <DecoratedHeader {...headerData} />
    <Button className="text-center" href={href} variant="outlined">
      {btnTitle}
    </Button>
  </Stack>
);

export default HeaderWithButton;
