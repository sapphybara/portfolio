import { RouteObject } from "react-router-dom";
import { CardHeaderProps } from "@mui/material/CardHeader";

export interface PropsWithRoutes {
  routes: RouteObject[];
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    decoration: React.CSSProperties;
    tag: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    decoration?: React.CSSProperties;
    tag?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    decoration: true;
    tag: true;
  }
}

export type SharedCardHeaderProps = Pick<
  CardHeaderProps,
  "avatar" | "subheader" | "title"
> & {
  // remove component property as it is overly restrictive on the titleTypographyProps
  // but it will still accept and respect the component property if passed (idk why??)
  titleTypographyProps?: Omit<
    CardHeaderProps["titleTypographyProps"],
    "component"
  >;
  subheaderTypographyProps?: Omit<
    CardHeaderProps["subheaderTypographyProps"],
    "component"
  >;
};

type PortfolioIconName =
  | "frontend"
  | "backend"
  | "fullstack"
  | "design"
  | "testing"
  | "tooling"
  | "language"
  | "library"
  | "developer"
  | "designer";

type Roles = "designer" | "developer";

interface TechStack {
  name: string;
  cardType: Exclude<PortfolioIconName, Roles>;
}

interface LinkInfo {
  to: string;
  target?: string;
  rel?: string;
}

export type Image = { src: string; alt: string };

export interface PortfolioCard {
  id: string;
  title: string;
  subheader: string;
  affiliation: string;
  description: string;
  techStack: TechStack[];
  linkInfo: LinkInfo;
  shareholderDescription?: string;
  roles: Roles[];
  contributions: string[];
  problemSolving: string[];
  shortDescription: string;
  images?: Image[];
}

export type CCScoreLevel = 1 | 2 | 3 | 4;

export type CCLevelMapping = Record<
  CCScoreLevel,
  { color: "success" | "info" | "warning" | "error"; label: string }
>;

export interface CCLevelConsumerProps {
  levelColors: CCLevelMapping;
  levels: CCScoreLevel[];
}