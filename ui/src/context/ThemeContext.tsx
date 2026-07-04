import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  ColorSchemeOption,
  ThemeMode,
  applyThemeAttributes,
  colorSchemeOptions,
  defaultColorScheme,
  defaultThemeMode,
  isValidThemeCombination,
  themeModeOptions,
} from "../config/themeConfig";

interface ThemeContextType {
  colorScheme: ColorSchemeOption;
  themeMode: ThemeMode;
  setColorScheme: (scheme: ColorSchemeOption) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getStoredColorScheme = (): ColorSchemeOption => {
  if (typeof window === "undefined") {
    return defaultColorScheme;
  }

  const saved = localStorage.getItem("terrakube-color-scheme") as ColorSchemeOption | null;
  return saved && colorSchemeOptions.includes(saved) ? saved : defaultColorScheme;
};

const getStoredThemeMode = (scheme: ColorSchemeOption): ThemeMode => {
  if (typeof window === "undefined") {
    return defaultThemeMode;
  }

  const saved = localStorage.getItem("terrakube-theme-mode") as ThemeMode | null;
  if (!saved || !themeModeOptions.includes(saved)) {
    return defaultThemeMode;
  }

  return isValidThemeCombination(scheme, saved) ? saved : "dark";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeOption>(getStoredColorScheme);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getStoredThemeMode(getStoredColorScheme()));

  const setColorScheme = (scheme: ColorSchemeOption) => {
    localStorage.setItem("terrakube-color-scheme", scheme);
    setColorSchemeState(scheme);
    // Blueprint exists only within the Technical scheme; leaving the scheme
    // while in blueprint falls back to the nearest dark theme.
    if (!isValidThemeCombination(scheme, themeMode)) {
      setThemeMode("dark");
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    localStorage.setItem("terrakube-theme-mode", mode);
    setThemeModeState(mode);
  };

  useEffect(() => {
    applyThemeAttributes(colorScheme, themeMode);
  }, [colorScheme, themeMode]);

  return (
    <ThemeContext.Provider value={{ colorScheme, themeMode, setColorScheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
