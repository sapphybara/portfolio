import { styled } from "@mui/material";
import { useContext } from "react";
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

const ResponsiveLogo = ({ logoInitial, rotation }: ResponsiveLogoProps) => {
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <Logo
      alt="logo"
      src={`/images/logo-${logoInitial}-${
        isDarkMode ? "dark" : "light"
      }-mode.png`}
      sx={{
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

export default ResponsiveLogo;
