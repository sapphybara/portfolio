import { Fragment, ReactNode, forwardRef, useContext, useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
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
import { PropsWithRoutes, PropsWithUser } from "types/global";
import ResumeLinkWithTooltip from "./ResumeLinkWithTooltip";
import { ThemeModeContext } from "@context/ThemeModeContext";
import { useFetcher, useRouteLoaderData } from "react-router-dom";

const NavList = styled(List)(({ theme }) => {
  const { palette } = theme;
  const linkColor =
    palette.mode === "dark" ? palette.primary.main : palette.common.black;

  return {
    "& .MuiListItem-root": {
      gap: theme.spacing(1),
      justifyContent: "center",
      whiteSpace: "nowrap",
    },
    "& .MuiSvgIcon-root": {
      color: linkColor,
    },
    "& .MuiButtonBase-root": {
      color: linkColor,
      "&:hover .MuiSvgIcon-root": {
        color: palette.common.white,
      },
    },
    "& .MuiLink-root": {
      color: linkColor,
      display: "flex",
      gap: theme.spacing(0.5),
      alignItems: "center",
    },
  };
});

const DarkModeSwitchListItem = styled(ListItem)(() => ({
  "&.MuiListItem-root": {
    padding: 0,
    "& .MuiListItemIcon-root": {
      alignItems: "center",
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

const SpinningListItemButton = styled(
  forwardRef(
    (
      props: ListItemButtonProps & {
        spin: boolean;
      },
      ref: React.Ref<HTMLDivElement>
    ) => {
      const { spin: _spin, ...rest } = props;
      return <ListItemButton ref={ref} {...rest} />;
    }
  )
)(({ spin }) => ({
  aspectRatio: spin ? "1" : "inherit",
  justifyContent: "center",
  "&:hover": {
    animation: spin ? `${SpinAnimation} 400ms linear` : "none",
  },
}));

const MobileDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
  },
}));

const Navbar = (props: PropsWithRoutes) => {
  const fetcher = useFetcher();
  const { user } = (useRouteLoaderData("root") as PropsWithUser) || {
    user: null,
  };

  const [mobileOpen, setMobileOpen] = useState(false);
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
          if (
            (path === "admin" && !user) ||
            ["login", "logout"].includes(path)
          ) {
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
          <fetcher.Form action="/logout" method="post">
            <ListItem>
              <Link component="button" type="submit" underline="hover">
                Sign Out
                <Logout color="primary" fontSize="small" />
              </Link>
            </ListItem>
          </fetcher.Form>
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
                className="rounded-full"
                dense
                onClick={toggleMode}
                spin={!mobileOpen}
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
    <MobileDrawer
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
    </MobileDrawer>
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
