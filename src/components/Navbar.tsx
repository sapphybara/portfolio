import { Fragment, ReactNode, useContext, useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListProps,
  Stack,
  StackProps,
  Toolbar,
  Tooltip,
  Typography,
  TypographyProps,
  keyframes,
  styled,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { PropsWithRoutes } from "types/global";
import "./navbar.css";
import { useAuth } from "@hooks/hooks";
import ResumeLinkWithTooltip from "./ResumeLinkWithTooltip";
import { ThemeModeContext } from "@context/ThemeModeContext";

const NavList = styled(List)(({ theme }) => {
  const { palette } = theme;
  const linkColor =
    palette.mode === "dark" ? palette.primary.main : palette.common.white;

  return {
    "& .MuiListItem-root": {
      gap: theme.spacing(1),
      justifyContent: "center",
      whiteSpace: "nowrap",
    },
    "& .MuiButtonBase-root": {
      color: linkColor,
      "& .MuiSvgIcon-root": {
        color: linkColor,
      },
      "&:hover .MuiSvgIcon-root": {
        color:
          palette.mode === "dark" ? palette.common.white : palette.common.black,
      },
    },
    "& .MuiLink-root": {
      color: linkColor,
    },
  };
});

const DarkModeSwitchListItem = styled(ListItem)(() => ({
  "&.MuiListItem-root": {
    padding: 0,
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
    },
  },
}));

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningListItemButton = styled(ListItemButton)`
  &:hover {
    animation: ${SpinAnimation} 400ms linear;
  }
`;

const Navbar = (props: PropsWithRoutes) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleMode } = useContext(ThemeModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const renderRouteLinks = (
    routes: typeof props.routes,
    shouldRenderChildren: boolean = true
  ): ReactNode => {
    return (
      <Fragment key={routes[0].path}>
        {routes.map((route) => {
          if (route.children && shouldRenderChildren) {
            return renderRouteLinks(route.children, false);
          }
          const { path = "" } = route;
          if (path === "admin" && !user) {
            return null;
          }
          const name =
            path === "" ? "Home" : path.charAt(0).toUpperCase() + path.slice(1);
          return (
            <ListItem key={path}>
              {path === "resume" ? (
                <ResumeLinkWithTooltip
                  asLink
                  linkOrButtonProps={{ underline: "hover" }}
                />
              ) : (
                <Link href={path} underline="hover">
                  {name}
                </Link>
              )}
            </ListItem>
          );
        })}
        {user && shouldRenderChildren && (
          <ListItem>
            <Link onClick={signOut} underline="hover">
              Sign Out
            </Link>
            <Logout color="primary" fontSize="small" />
          </ListItem>
        )}
      </Fragment>
    );
  };

  const renderHeaderAndLinks = (
    stackProps: StackProps,
    typographyProps: TypographyProps,
    listProps?: ListProps,
    isMobile: boolean = false
  ) => {
    return (
      <Stack direction={isMobile ? "column" : "row"} {...stackProps}>
        <Typography {...typographyProps}>Sapphyra Wiser</Typography>
        {isMobile && <Divider />}
        <NavList {...listProps}>
          <DarkModeSwitchListItem>
            <Tooltip
              arrow
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              <SpinningListItemButton
                className="aspect-square rounded-full"
                dense
                onClick={toggleMode}
              >
                <ListItemIcon>
                  {isDarkMode ? (
                    <LightModeOutlined color="action" />
                  ) : (
                    <DarkModeOutlined color="action" />
                  )}
                </ListItemIcon>
              </SpinningListItemButton>
            </Tooltip>
          </DarkModeSwitchListItem>
          {renderRouteLinks(props.routes)}
        </NavList>
      </Stack>
    );
  };

  const drawer = (
    <Drawer
      className="drawer"
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
        { className: "my-2", variant: "h6" },
        undefined,
        true
      )}
    </Drawer>
  );

  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            className="mr-2"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {renderHeaderAndLinks(
            {
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            },
            {
              sx: { display: { xs: "none", sm: "block" } },
              variant: "h6",
            },
            {
              className: "flex-row justify-center items-center p-0",
              sx: { display: { xs: "none", sm: "flex" } },
            }
          )}
        </Toolbar>
      </AppBar>
      <nav>{drawer}</nav>
    </>
  );
};

export default Navbar;
