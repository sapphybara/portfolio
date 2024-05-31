import { Drawer, styled } from "@mui/material";
import { ReactNode } from "react";
import NavbarContent from "./NavbarContent";
import { PropsWithRoutes } from "types/global";
import { RouteObject } from "react-router-dom";

const MobileNavigationDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
  },
}));

interface MobileDrawerProps extends PropsWithRoutes {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  renderRouteLinks: (
    routes: RouteObject[],
    shouldRenderChildren: boolean,
    isMobile: boolean
  ) => ReactNode;
}

const MobileDrawer: (props: MobileDrawerProps) => ReactNode = ({
  mobileOpen,
  handleDrawerToggle,
  routes,
  renderRouteLinks,
}) => (
  <nav>
    <MobileNavigationDrawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      <NavbarContent
        isMobile
        mobileOpen={mobileOpen}
        renderRouteLinks={renderRouteLinks}
        routes={routes}
        stackProps={{ className: "text-center", onClick: handleDrawerToggle }}
        typographyProps={{
          className: "my-2",
          color: "text.primary",
          variant: "h6",
        }}
      />
    </MobileNavigationDrawer>
  </nav>
);

export default MobileDrawer;
