import { IconButton, keyframes, styled } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeModeContext } from "@context/ThemeModeContext";

const RotateS = keyframes`
  from {
    transform: rotate(270deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotateW = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(270deg);
  }
`;

const Logo = styled("img")<{ initial: "s" | "w" }>(({ initial }) => ({
  aspectRatio: "1",
  height: 35,
  animation: `${initial === "s" ? RotateS : RotateW} 400ms forwards`,
}));

const ResponsiveLogo = () => {
  const [logoInitial, setLogoInitial] = useState<"s" | "w">("s");
  const { isDarkMode } = useContext(ThemeModeContext);

  const handleLogoClick = () => {
    setLogoInitial((prevState) => {
      switch (prevState) {
        case "s":
          return "w";
        case "w":
        default:
          return "s";
      }
    });
  };

  return (
    <IconButton className="mr-2" onClick={handleLogoClick}>
      <Logo
        alt="logo"
        initial={logoInitial}
        src={`/logo-${logoInitial}-${isDarkMode ? "dark" : "light"}-mode.png`}
      />
    </IconButton>
  );
};

export default ResponsiveLogo;
