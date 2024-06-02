import { ReactNode, forwardRef, useContext, useState } from "react";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Divider,
  Tooltip,
  Icon,
  Link,
  styled,
  StackProps,
  TypographyProps,
  IconButton,
  IconButtonProps,
  List,
  keyframes,
  ListProps,
  Badge,
} from "@mui/material";
import ResponsiveLogo from "@components/ResponsiveLogo";
import { ThemeModeContext } from "@context/ThemeModeContext";
import { PropsWithRoutes } from "types/global";
import { RouteObject } from "react-router-dom";

interface NavListProps extends ListProps {
  isInMobileDrawer?: boolean;
}

const NavList = styled(({ isInMobileDrawer: _, ...props }: NavListProps) => (
  <List {...props} />
))(({ isInMobileDrawer, theme }) => {
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
      "&:last-child": {
        paddingRight: isInMobileDrawer ? undefined : 0,
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
NavList.displayName = "NavList";

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

const ResumeLink = styled(Link)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center",
}));

interface NavbarContentProps {
  isMobile: boolean;
  listProps?: ListProps;
  mobileOpen: boolean;
  renderRouteLinks: (
    routes: RouteObject[],
    shouldRenderChildren: boolean,
    isMobile: boolean
  ) => ReactNode;
  stackProps: StackProps;
  typographyProps: TypographyProps;
}

const NavbarContent: (
  props: NavbarContentProps & PropsWithRoutes
) => ReactNode = ({
  isMobile,
  listProps,
  mobileOpen,
  renderRouteLinks,
  routes,
  stackProps,
  typographyProps,
}) => {
  const stackDirection = isMobile ? "column" : "row";
  const { isDarkMode, toggleMode } = useContext(ThemeModeContext);

  const [logoInitial, setLogoInitial] = useState<"s" | "w">("s");
  const [rotation, setRotation] = useState(0);

  const handleLogoClick = () => {
    const newInitial = logoInitial === "s" ? "w" : "s";
    setLogoInitial(newInitial);
    setRotation(
      (prevRotation) => prevRotation + (newInitial === "w" ? 90 : 270)
    );
  };

  return (
    <Stack direction={stackDirection} {...stackProps}>
      <ResumeLink
        justifyContent="center"
        href="/"
        onClick={handleLogoClick}
        underline="none"
      >
        {!isMobile && (
          <IconButton aria-label="this website is in beta" className="p-0">
            <Badge badgeContent="Alpha" color="warning" overlap="rectangular">
              <ResponsiveLogo logoInitial={logoInitial} rotation={rotation} />
            </Badge>
          </IconButton>
        )}
        <Typography color="common.white" {...typographyProps}>
          Sapphyra Wiser
        </Typography>
      </ResumeLink>
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
        <NavList {...listProps} isInMobileDrawer={isMobile}>
          {renderRouteLinks(routes, true, isMobile)}
        </NavList>
      </Stack>
    </Stack>
  );
};

export default NavbarContent;
