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
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { GitHub, LinkedIn, Menu as MenuIcon } from "@mui/icons-material";
import { PropsWithRoutes } from "types/global";
import "./navbar.css";

const socials = [
  { icon: <LinkedIn />, url: "https://www.linkedin.com/in/sapphybara/" },
  { icon: <GitHub />, url: "https://www.github.com/sapphybara" },
];

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

  const renderSocialIcons = () =>
    socials.map((site) => (
      <ListItemIcon key={site.url}>
        <Link href={site.url} target="__blank" rel="noopener noreferrer">
          {site.icon}
        </Link>
      </ListItemIcon>
    ));

  const drawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
        },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Sapphyra Wiser
        </Typography>
        <Divider />
        <List>
          {renderRouteLinks(props.routes)}
          {renderSocialIcons()}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sapphyra Wiser
          </Typography>
          <List
            className="flex-row justify-center items-end"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            {renderRouteLinks(props.routes)}
            {renderSocialIcons()}
          </List>
        </Toolbar>
      </AppBar>
      <nav>{drawer}</nav>
    </>
  );
};

export default Navbar;
