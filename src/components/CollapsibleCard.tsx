import { ReactNode, useState } from "react";
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  CardActionArea,
  CardProps,
  CardHeaderProps,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface CollapsibleCardProps
  extends Omit<CardProps, "title">,
    Pick<CardHeaderProps, "avatar" | "subheader" | "title"> {
  collapseClassName?: string;
  defaultIsOpen?: boolean;
  // remove component property as it is overly restrictive on the titleTypographyProps
  // but it will still accept and respect the component property if passed (idk why??)
  titleTypographyProps?: Omit<
    CardHeaderProps["titleTypographyProps"],
    "component"
  >;
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
  title,
  titleTypographyProps,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <Card className={`${className}${isOpen ? "" : " collapsed"}`} raised>
      <CardActionArea
        className="flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardHeader
          avatar={avatar}
          subheader={subheader}
          title={title}
          titleTypographyProps={titleTypographyProps}
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
