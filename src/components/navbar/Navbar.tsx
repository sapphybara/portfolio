import { Fragment, ReactNode, useState } from "react";
import { AppBar, IconButton, Link, ListItem, Toolbar } from "@mui/material";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import { PropsWithRoutes, PropsWithUser } from "types/global";
import ResumeLinkWithTooltip from "@components/ResumeLinkWithTooltip";
import { useFetcher, useLocation, useRouteLoaderData } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import NavbarContent from "./NavbarContent";

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
            ["login", "logout", "portfolio"].includes(path)
          ) {
            return null;
          }
          const name =
            path === ""
              ? "Portfolio"
              : path.charAt(0).toUpperCase() + path.slice(1);
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
          <NavbarContent
            isMobile={false}
            listProps={{
              className: "flex-row justify-center items-center p-0",
              sx: { display: { xs: "none", sm: "flex" } },
            }}
            mobileOpen={mobileOpen}
            renderRouteLinks={renderRouteLinks}
            routes={props.routes}
            stackProps={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
            typographyProps={{
              sx: { display: { xs: "none", sm: "block" } },
              variant: "h6",
            }}
          />
        </Toolbar>
      </AppBar>
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        renderRouteLinks={renderRouteLinks}
        routes={props.routes}
      />
    </>
  );
};

export default Navbar;
