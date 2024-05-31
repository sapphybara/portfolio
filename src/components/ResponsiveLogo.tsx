import { IconButton, styled } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeModeContext } from "@context/ThemeModeContext";

const Logo = styled("img")(() => ({
  aspectRatio: "1",
  height: 35,
  transition: "transform 400ms ease-out",
}));

const ResponsiveLogo = () => {
  const [logoInitial, setLogoInitial] = useState<"s" | "w">("s");
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState<1 | -1>(1);

  const { isDarkMode } = useContext(ThemeModeContext);

  const handleLogoClick = () => {
    setLogoInitial((prevState) => (prevState === "s" ? "w" : "s"));
    setRotation((prevRotation) => prevRotation + 180);
    setFlip((prevFlip) => (prevFlip * -1) as 1 | -1);
  };

  return (
    <IconButton className="p-0" onClick={handleLogoClick}>
      <Logo
        alt="logo"
        src={`/logo-${logoInitial}-${isDarkMode ? "dark" : "light"}-mode.png`}
        sx={{
          transform: `rotate(${rotation}deg) scaleY(${flip})`,
        }}
      />
    </IconButton>
  );
};

export default ResponsiveLogo;
