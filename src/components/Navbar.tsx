import { ReactNode } from "react";
import { AppBar, Link, List, ListItem } from "@mui/material";
import { PropsWithRoutes } from "types/global";

const Navbar = (props: PropsWithRoutes) => {
  const renderRoutes = (routes: typeof props.routes): ReactNode[] =>
    routes.map((route) => {
      if (route.children) {
        return renderRoutes(route.children);
      }

      const { path = "" } = route;
      const name =
        path === "" ? "Home" : path.charAt(0).toUpperCase() + path.slice(1);
      return (
        <ListItem key={path}>
          <Link href={path}>{name}</Link>
        </ListItem>
      );
    });

  return (
    <AppBar component="nav" position="static">
      <List className="flex flex-row">{renderRoutes(props.routes)}</List>
    </AppBar>
  );
};

export default Navbar;
