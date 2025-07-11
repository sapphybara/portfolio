import { Chip, Stack } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { Role, TechStack } from "types/global";
import { ElementType } from "react";

type ChipItem = TechStack | Role;

const TagChips = (props: { items: ChipItem[] }) => {
  const renderTagIcon = (iconName: string) => {
    const IconComponent =
      (MuiIcons as Record<string, ElementType<object>>)[iconName] ||
      MuiIcons.ExtensionOutlined;
    return <IconComponent color="primary" fontSize="small" />;
  };

  return (
    <Stack
      className="pl-4"
      component="ul"
      direction="row"
      flexWrap="wrap"
      gap={1}
    >
      {props.items.map((item) => {
        const chipKeyAndLabel = {
          key: item.name,
          label: item.name,
        };
        const iconName = item.icon;

        return (
          <Chip
            component="li"
            icon={renderTagIcon(iconName)}
            {...chipKeyAndLabel}
          />
        );
      })}
    </Stack>
  );
};

export default TagChips;
