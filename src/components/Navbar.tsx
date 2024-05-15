import { Fragment, ReactNode, forwardRef, useContext, useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  IconButtonProps,
  Link,
  List,
  ListItem,
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
import { useFetcher, useLocation, useRouteLoaderData } from "react-router-dom";

const NavList = styled(List)(({ theme }) => {
  const { palette } = theme;
  const isDarkMode = palette.mode === "dark";
  const linkColor = isDarkMode ? palette.primary.main : palette.common.white;

  return {
    "& .MuiListItem-root": {
      gap: theme.spacing(1),
      justifyContent: "center",
      whiteSpace: "nowrap",
      "&.mobile .MuiLink-root": {
        color: palette.primary.main,
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

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningIconButton = styled(
  forwardRef(
    (
      props: IconButtonProps & {
        spin: boolean;
      },
      ref: React.Ref<HTMLButtonElement>
    ) => {
      const { spin: _spin, ...rest } = props;
      return <IconButton ref={ref} {...rest} />;
    }
  )
)(({ spin, theme }) => {
  const isDarkMode = theme.palette.mode === "dark";
  const linkColor = isDarkMode
    ? theme.palette.primary.main
    : theme.palette.common.white;

  return {
    aspectRatio: spin ? "1" : "inherit",
    justifyContent: "center",
    "&:hover": {
      animation: spin ? `${SpinAnimation} 400ms linear` : "none",
    },
    "& .MuiSvgIcon-root": {
      color: linkColor,
      "&:hover": {
        color: isDarkMode
          ? theme.palette.common.white
          : theme.palette.common.black,
      },
    },
  };
});

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
  const location = useLocation();
  const fromUrl = location.pathname.startsWith("/admin")
    ? "/"
    : encodeURIComponent(location.pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleMode } = useContext(ThemeModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const renderRouteLinks = (
    routes: typeof props.routes,
    shouldRenderChildren: boolean,
    isMobile: boolean
  ): ReactNode => {
    return (
      <Fragment key={routes[0].path}>
        {routes.map((route) => {
          if (route.children && shouldRenderChildren) {
            return renderRouteLinks(route.children, false, isMobile);
          }
          const { path = "" } = route;
          if (
            (path === "admin" && import.meta.env.PROD && !user) ||
            ["login", "logout"].includes(path)
          ) {
            return null;
          }
          const name =
            path === "" ? "Home" : path.charAt(0).toUpperCase() + path.slice(1);
          return (
            <ListItem className={isMobile ? "mobile" : undefined} key={path}>
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
          <fetcher.Form action={`/logout?from=${fromUrl}`} method="post">
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
    const stackDirection = isMobile ? "column" : "row";

    return (
      <Stack direction={stackDirection} {...stackProps}>
        <Typography {...typographyProps}>Sapphyra Wiser</Typography>
        {isMobile && <Divider />}
        <Stack
          direction={stackDirection}
          flexWrap="wrap"
          flexGrow={1}
          justifyContent="flex-end"
        >
          {!isMobile && (
            <Tooltip
              arrow
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              <SpinningIconButton
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                className="rounded-full"
                onClick={toggleMode}
                spin={!mobileOpen}
              >
                <Icon>
                  {isDarkMode ? (
                    <LightModeOutlined color="action" />
                  ) : (
                    <DarkModeOutlined color="action" />
                  )}
                </Icon>
              </SpinningIconButton>
            </Tooltip>
          )}
          <NavList {...listProps}>
            {renderRouteLinks(props.routes, true, isMobile)}
          </NavList>
        </Stack>
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
            <MenuIcon className="text-white" />
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
