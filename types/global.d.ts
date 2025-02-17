import { RouteObject } from "react-router-dom";
import { CardHeaderProps } from "@mui/material";
import { roles } from "@utils/utils";

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

type TechStackIcon =
  | "frontend"
  | "backend"
  | "fullstack"
  | "design"
  | "testing"
  | "tooling"
  | "language"
  | "library"
  | "seo";

type Role = (typeof roles)[number];

type PortfolioIconName = TechStackIcon | Role;

interface TechStack {
  name: string;
  cardType: TechStackIcon;
}

// todo should we use the type of muis link component instead of this?
interface Link {
  type: "code" | "live";
  href: string;
}

export type PortfolioItemImage = {
  src: string;
  alt: string;
  description: string;
};

export interface PortfolioItem {
  id: string;
  title: string;
  subheader: string;
  affiliation: string;
  description: string;
  techStack: TechStack[];
  links?: Link[];
  shareholderDescription?: string;
  roles: Role[];
  contributions: string[];
  problemSolving: string[];
  shortDescription: string;
  images?: PortfolioItemImage[];
}

export type CCScoreLevel = 1 | 2 | 3 | 4;

export type CCLevelMapping = {
  [K in CCScoreLevel]: {
    color: "success" | "info" | "warning" | "error";
    label: string;
  };
};

export interface PropsWithUser {
  user: string | null;
}

export interface LoaderActionError {
  message?: string;
  status?: string;
}

export interface ContactFormField {
  key: "name" | "email" | "subject" | "message";
  label: string;
  type: "text" | "email";
}

export interface TabState {
  maxTabHeight: number;
  setMaxTabHeight: (value: number) => void;
  setTabIdx: (value: number) => void;
  tabIdx: number;
}

type ResumeDataType = "list" | "paragraph" | "flat";

interface BaseResumeDataItem extends Omit<SharedCardHeaderProps, "title"> {
  defaultIsOpen?: boolean;
  id: string;
  title: string;
}

interface StringResumeDataItem extends BaseResumeDataItem {
  data?: string[];
  dataType: ResumeDataType;
}

interface NestedResumeDataItem extends BaseResumeDataItem {
  data?: ResumeDataItem[];
  dataType?: ResumeDataType;
}

export type ResumeDataItem = StringResumeDataItem | NestedResumeDataItem;
