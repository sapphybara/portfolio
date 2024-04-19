import { Chip, Stack } from "@mui/material";
import {
  BugReportOutlined,
  BuildOutlined,
  CodeOutlined,
  DesignServicesOutlined,
  DesktopWindowsOutlined,
  ExtensionOutlined,
  StorageOutlined,
} from "@mui/icons-material";
import { TechStack } from "types/global";

const TechnologyChips = (props: { technology: TechStack[] }) => {
  const renderTagIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <DesktopWindowsOutlined color="secondary" fontSize="small" />;
      case "backend":
        return <StorageOutlined color="secondary" fontSize="small" />;
      case "fullstack":
        return <CodeOutlined color="secondary" fontSize="small" />;
      case "design":
        return <DesignServicesOutlined color="secondary" fontSize="small" />;
      case "testing":
        return <BugReportOutlined color="secondary" fontSize="small" />;
      case "tooling":
        return <BuildOutlined color="secondary" fontSize="small" />;
      default:
        return <ExtensionOutlined color="secondary" fontSize="small" />;
    }
  };

  return (
    <Stack direction="row" gap={1}>
      {props.technology.map((technology) => (
        <Chip
          key={technology.name}
          icon={renderTagIcon(technology.cardType)}
          label={technology.name}
        />
      ))}
    </Stack>
  );
};
export default TechnologyChips;
