import { PaletteMode } from "@mui/material";
import { PropsWithChildren, createContext, useState } from "react";

type ThemeContextType = {
  theme: PaletteMode;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
