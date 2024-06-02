import { styled } from "@mui/material";
import { FC, useContext } from "react";
import { ThemeModeContext } from "@context/ThemeModeContext";

const Logo = styled("img")(() => ({
  aspectRatio: "1",
  height: 35,
  transition: "transform 400ms ease-out",
}));

interface ResponsiveLogoProps {
  logoInitial: "s" | "w";
  rotation: number;
}

const ResponsiveLogo: FC<ResponsiveLogoProps> = ({ logoInitial, rotation }) => {
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <Logo
      alt="logo"
      src={`/logo-${logoInitial}-${isDarkMode ? "dark" : "light"}-mode.png`}
      sx={{
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

export default ResponsiveLogo;
