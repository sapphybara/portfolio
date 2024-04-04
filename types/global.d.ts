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
