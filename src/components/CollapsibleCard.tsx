import { ReactNode, useState } from "react";
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  CardActionArea,
  CardProps,
  Paper,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { SharedCardHeaderProps } from "types/global";

interface CollapsibleCardProps
  extends Omit<CardProps, "title">,
    SharedCardHeaderProps {
  collapseClassName?: string;
  defaultIsOpen?: boolean;
}

/**
 * A collapsible card component that can be used to display content that can be toggled.
 */
const CollapsibleCard: (props: CollapsibleCardProps) => ReactNode = ({
  avatar,
  children,
  className,
  collapseClassName,
  defaultIsOpen = false,
  subheader,
  subheaderTypographyProps,
  title,
  titleTypographyProps,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const hasChildren = !!children;

  return (
    <Card
      className={`${className}${isOpen ? "" : " collapsed"}`}
      variant="outlined"
    >
      <CardActionArea
        className="flex justify-between"
        disabled={!hasChildren}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardHeader
          avatar={avatar}
          subheader={subheader}
          title={title}
          titleTypographyProps={titleTypographyProps}
          subheaderTypographyProps={subheaderTypographyProps}
        />
        <ExpandMore
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform mr-4`}
          color={hasChildren ? "inherit" : "disabled"}
        />
      </CardActionArea>
      {hasChildren && (
        <Collapse in={isOpen}>
          <Divider />
          <Paper className={collapseClassName}>{children}</Paper>
        </Collapse>
      )}
    </Card>
  );
};

export default CollapsibleCard;
