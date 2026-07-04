import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  AccentOption,
  ColorSchemeOption,
  ThemeMode,
  accentOptions,
  applyThemeAttributes,
  colorSchemeOptions,
  defaultAccent,
  defaultColorScheme,
  defaultThemeMode,
  isValidThemeCombination,
  themeModeOptions,
} from "../config/themeConfig";

interface ThemeContextType {
  colorScheme: ColorSchemeOption;
  themeMode: ThemeMode;
  accent: AccentOption;
  setColorScheme: (scheme: ColorSchemeOption) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentOption) => void;
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

const getStoredAccent = (): AccentOption => {
  if (typeof window === "undefined") {
    return defaultAccent;
  }

  const saved = localStorage.getItem("terrakube-accent") as AccentOption | null;
  return saved && accentOptions.includes(saved) ? saved : defaultAccent;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeOption>(getStoredColorScheme);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getStoredThemeMode(getStoredColorScheme()));
  const [accent, setAccentState] = useState<AccentOption>(getStoredAccent);

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

  const setAccent = (value: AccentOption) => {
    localStorage.setItem("terrakube-accent", value);
    setAccentState(value);
  };

  useEffect(() => {
    applyThemeAttributes(colorScheme, themeMode, accent);
  }, [colorScheme, themeMode, accent]);

  return (
    <ThemeContext.Provider value={{ colorScheme, themeMode, accent, setColorScheme, setThemeMode, setAccent }}>
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
