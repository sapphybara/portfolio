import { ElementType } from "react";
import { Chip, ChipProps, Stack } from "@mui/material";
import {
  BugReportOutlined,
  BuildOutlined,
  CodeOutlined,
  DesktopWindowsOutlined,
  DesignServicesOutlined,
  ExtensionOutlined,
  LibraryBooksOutlined,
  StorageOutlined,
  WebAssetOutlined,
  DeveloperModeOutlined,
  PaletteOutlined,
  ScienceOutlined,
} from "@mui/icons-material";
import { PortfolioIconName, Roles, TechStack } from "types/global";
import { isTechStack } from "@utils/typeGuards";

type ChipItem = TechStack | Roles;

const iconMap: Record<PortfolioIconName, ElementType> = {
  frontend: DesktopWindowsOutlined,
  backend: StorageOutlined,
  fullstack: WebAssetOutlined,
  design: DesignServicesOutlined,
  testing: BugReportOutlined,
  tooling: BuildOutlined,
  language: CodeOutlined,
  library: LibraryBooksOutlined,
  developer: DeveloperModeOutlined,
  designer: PaletteOutlined,
  researcher: ScienceOutlined,
};

const TagChips = (props: { items: ChipItem[] }) => {
  const renderTagIcon = (iconName: PortfolioIconName) => {
    const Icon =
      iconMap[iconName.toLowerCase() as PortfolioIconName] || ExtensionOutlined;
    return <Icon color="primary" fontSize="small" />;
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
        const chipKeyAndLabel: Pick<ChipProps, "key" | "label"> = {
          key: "",
          label: "",
        };
        let iconName: PortfolioIconName;
        if (isTechStack(item)) {
          chipKeyAndLabel.key = item.name;
          chipKeyAndLabel.label = item.name;
          iconName = item.cardType;
        } else {
          chipKeyAndLabel.key = item;
          chipKeyAndLabel.label = item;
          iconName = item;
        }

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
