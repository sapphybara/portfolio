import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { PropsWithRoutes } from "types/global";
import "./navbar.css";

const Navbar = (props: PropsWithRoutes) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const renderRouteLinks = (routes: typeof props.routes): ReactNode[] =>
    routes.map((route) => {
      if (route.children) {
        return renderRouteLinks(route.children);
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
      <Box onClick={handleDrawerToggle} className="text-center">
        <Typography className="my-2" variant="h6">
          Sapphyra Wiser
        </Typography>
        <Divider />
        <List>{renderRouteLinks(props.routes)}</List>
      </Box>
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
          <Typography
            className="grow"
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Sapphyra Wiser
          </Typography>
          <List
            className="flex-row justify-center items-end"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {renderRouteLinks(props.routes)}
          </List>
        </Toolbar>
      </AppBar>
      <nav>{drawer}</nav>
    </>
  );
};

export default Navbar;
