import { FC, PropsWithChildren, useRef } from "react";
import { Box } from "@mui/material";

interface CustomTabPanelProps extends PropsWithChildren {
  idPrefix: string;
  index: number;
  value: number;
}

const CustomTabPanel: FC<CustomTabPanelProps> = ({
  children,
  idPrefix,
  index,
  value,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const isTabVisible = index === value;

  return (
    <Box
      aria-labelledby={`${idPrefix}-tab-${index}`}
      id={`${idPrefix}-tabpanel-${index}`}
      hidden={!isTabVisible}
      ref={tabRef}
      role="tabpanel"
    >
      {isTabVisible && children}
    </Box>
  );
};

export default CustomTabPanel;
