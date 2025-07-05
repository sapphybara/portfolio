import { PropsWithChildren, useRef } from "react";
import { Box } from "@mui/material";

interface CustomTabPanelProps extends PropsWithChildren {
  idPrefix: string;
  index: number;
  value: number;
}

const CustomTabPanel = ({
  children,
  idPrefix,
  index,
  value,
}: CustomTabPanelProps) => {
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
