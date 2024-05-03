import { PaletteMode, useMediaQuery } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";

type ThemeModeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
  isDarkMode: boolean;
};

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "dark",
  toggleMode: () => {},
  isDarkMode: true,
});

const localStorageKey = "sapphyra-wiser-portfolio_theme";

const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // Get mode from local storage or prefersDarkMode or default to 'light'
  const initialMode =
    (localStorage.getItem(localStorageKey) as PaletteMode) ||
    (prefersDarkMode ? "dark" : "light");

  const [mode, setMode] = useState<PaletteMode>(initialMode);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem(localStorageKey, newMode);
    setMode(newMode);
  };

  return (
    <ThemeModeContext.Provider
      value={{ mode, toggleMode, isDarkMode: mode === "dark" }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
