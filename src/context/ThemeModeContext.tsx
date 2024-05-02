import { PaletteMode } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";

type ThemeModeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleMode: () => {},
});

const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;