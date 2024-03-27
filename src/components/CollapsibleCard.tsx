import { ReactNode, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Collapse,
  Divider,
  CardActionArea,
  CardProps,
  CardHeaderProps,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface CollapsibleCardProps extends CardProps {
  collapseClassName?: string;
  defaultIsOpen?: boolean;
  headerIcon?: ReactNode;
  title: string;
  titleTypographyProps?: CardHeaderProps["titleTypographyProps"];
}

const CollapsibleCard: (props: CollapsibleCardProps) => ReactNode = ({
  children,
  className,
  collapseClassName,
  defaultIsOpen = false,
  headerIcon,
  title,
  titleTypographyProps = { variant: "h3" },
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  return (
    <Card className={`${className}${isOpen ? "" : " collapsed"}`} raised>
      <CardActionArea
        className="flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardHeader
          avatar={headerIcon}
          title={title}
          titleTypographyProps={{ component: "h4", ...titleTypographyProps }}
        />
        <ExpandMore
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform mr-4`}
        />
      </CardActionArea>
      <Collapse in={isOpen}>
        <Divider />
        <Box className={collapseClassName}>{children}</Box>
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;
