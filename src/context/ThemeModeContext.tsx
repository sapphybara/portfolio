import { PaletteMode } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";

type ThemeModeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
};

const defaultMode: PaletteMode = "dark";

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: defaultMode,
  toggleMode: () => {},
});

const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<PaletteMode>(defaultMode);

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