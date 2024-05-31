import {
  Drawer,
  ListProps,
  StackProps,
  TypographyProps,
  styled,
} from "@mui/material";
import { ReactNode } from "react";

const MobileNavigationDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
  },
}));

interface MobileDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  renderHeaderAndLinks: (
    stackProps: StackProps,
    typographyProps: TypographyProps,
    listProps?: ListProps,
    isMobile?: boolean
  ) => JSX.Element;
}

const MobileDrawer: (props: MobileDrawerProps) => ReactNode = ({
  mobileOpen,
  handleDrawerToggle,
  renderHeaderAndLinks,
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
      {renderHeaderAndLinks(
        { className: "text-center", onClick: handleDrawerToggle },
        { className: "my-2", color: "text.primary", variant: "h6" },
        undefined,
        true
      )}
    </MobileNavigationDrawer>
  </nav>
);

export default MobileDrawer;
