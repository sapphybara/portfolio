import { ElementType } from "react";
import { Chip, Stack } from "@mui/material";
import {
  BugReportOutlined,
  BuildOutlined,
  CodeOutlined,
  DesignServicesOutlined,
  DesktopWindowsOutlined,
  ExtensionOutlined,
  LibraryBooksOutlined,
  StorageOutlined,
  WebAssetOutlined,
} from "@mui/icons-material";
import { TechStack } from "types/global";

const iconMap: Record<string, ElementType> = {
  frontend: DesktopWindowsOutlined,
  backend: StorageOutlined,
  fullstack: WebAssetOutlined,
  design: DesignServicesOutlined,
  testing: BugReportOutlined,
  tooling: BuildOutlined,
  language: CodeOutlined,
  library: LibraryBooksOutlined,
};

const TechnologyChips = (props: { technology: TechStack[] }) => {
  const renderTagIcon = (type: string) => {
    const Icon = iconMap[type] || ExtensionOutlined;
    return <Icon color="secondary" fontSize="small" />;
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {props.technology.map((technology) => (
        <Chip
          component="li"
          key={technology.name}
          icon={renderTagIcon(technology.cardType)}
          label={technology.name}
        />
      ))}
    </Stack>
  );
};
export default TechnologyChips;
