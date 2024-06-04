import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface CustomTabPanelProps extends PropsWithChildren {
  idPrefix: string;
  index: number;
  maxTabHeight: number;
  setMaxTabHeight: (height: number) => void;
  value: number;
}

const CustomTabPanel: FC<CustomTabPanelProps> = ({
  children,
  idPrefix,
  index,
  maxTabHeight,
  setMaxTabHeight,
  value,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const isTabVisible = index === value;

  useEffect(() => {
    // updates the height of the tallest tab so the screen doesn't scroll when switching tabs
    if (isTabVisible && tabRef.current) {
      const currentHeight = tabRef.current.clientHeight;
      if (currentHeight > maxTabHeight) {
        setMaxTabHeight(currentHeight);
      }
    }
  }, [isTabVisible, maxTabHeight, setMaxTabHeight]);

  return (
    <Box
      aria-labelledby={`${idPrefix}-tab-${index}`}
      id={`${idPrefix}-tabpanel-${index}`}
      minHeight={maxTabHeight}
      hidden={!isTabVisible}
      ref={tabRef}
      role="tabpanel"
    >
      {isTabVisible && children}
    </Box>
  );
};

export default CustomTabPanel;
