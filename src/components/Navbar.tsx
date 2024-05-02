import { Fragment, ReactNode, useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListProps,
  Stack,
  StackProps,
  Toolbar,
  Typography,
  TypographyProps,
} from "@mui/material";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import { PropsWithRoutes } from "types/global";
import "./navbar.css";
import { useAuth } from "@hooks/hooks";

const Navbar = (props: PropsWithRoutes) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

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
            <ListItem className="justify-center" key={path}>
              <Link href={path}>{name}</Link>
            </ListItem>
          );
        })}
        {user && shouldRenderChildren && (
          <ListItem className="justify-center whitespace-nowrap gap-2">
            <Link component="button" onClick={signOut}>
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
        <List {...listProps}>{renderRouteLinks(props.routes)}</List>
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
              className: "flex-row justify-center items-end",
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
