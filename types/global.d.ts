import { RouteObject } from "react-router-dom";

export interface PropsWithRoutes {
  routes: RouteObject[];
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    decoration: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    decoration?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    decoration: true;
  }
}
