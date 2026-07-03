import { ThemeConfig, theme } from "antd";

export type ColorSchemeOption = "default" | "terrakube" | "technical";
export type ThemeMode = "light" | "dark";

// =========================================================================
// "Technical" scheme — a monospace engineering design language: terminal
// typography, square corners, 1px rules, flat surfaces and hard-edged
// shadows. The font stack falls through to the best monospace available
// on each platform. The companion CSS lives in src/styles/technical.css,
// scoped under [data-color-scheme="technical"].
// =========================================================================

export const FONT_MONO =
  '"Berkeley Mono", ui-monospace, "SF Mono", SFMono-Regular, "Cascadia Mono", "JetBrains Mono", "IBM Plex Mono", Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace';

// Ink on paper.
const techLightTokens = {
  colorBgBase: "#ffffff",
  colorBgContainer: "#ffffff",
  colorBgElevated: "#ffffff",
  colorBgLayout: "#f2f2ed",
  colorBgSpotlight: "#141414",

  colorText: "#141414",
  colorTextSecondary: "rgba(20, 20, 20, 0.65)",
  colorTextTertiary: "rgba(20, 20, 20, 0.45)",
  colorTextQuaternary: "rgba(20, 20, 20, 0.25)",

  colorBorder: "#141414",
  colorBorderSecondary: "#d9d9d0",
  colorSplit: "#e4e4db",

  colorFill: "#edede6",
  colorFillSecondary: "#f0f0e9",
  colorFillTertiary: "#f5f5ef",
  colorFillQuaternary: "#fafaf5",

  colorSuccess: "#0f7b3a",
  colorWarning: "#b45309",
  colorError: "#c9282d",
  colorInfo: "#1b3be0",

  boxShadow: "4px 4px 0 rgba(20, 20, 20, 0.08)",
  boxShadowSecondary: "6px 6px 0 rgba(20, 20, 20, 0.1)",
};

// Phosphor on black.
const techDarkTokens = {
  colorBgBase: "#0a0a0a",
  colorBgContainer: "#111110",
  colorBgElevated: "#181816",
  colorBgLayout: "#0a0a0a",
  colorBgSpotlight: "#1f1f1d",

  colorText: "#edede8",
  colorTextSecondary: "#a6a69e",
  colorTextTertiary: "#73736c",
  colorTextQuaternary: "#4a4a44",

  colorBorder: "#52524b",
  colorBorderSecondary: "#26261f",
  colorSplit: "#26261f",

  colorFill: "#26261f",
  colorFillSecondary: "#1c1c18",
  colorFillTertiary: "#161613",
  colorFillQuaternary: "#111110",

  colorSuccess: "#3fb950",
  colorWarning: "#f0883e",
  colorError: "#f85149",
  colorInfo: "#7b96ff",

  boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.55)",
  boxShadowSecondary: "6px 6px 0 rgba(0, 0, 0, 0.55)",
};

const techSharedTokens = {
  fontFamily: FONT_MONO,
  fontFamilyCode: FONT_MONO,
  fontSize: 13,
  fontSizeHeading1: 30,
  fontSizeHeading2: 24,
  fontSizeHeading3: 19,
  fontSizeHeading4: 15,
  fontSizeHeading5: 13,

  borderRadius: 0,
  borderRadiusLG: 0,
  borderRadiusSM: 0,
  borderRadiusXS: 0,

  wireframe: true,
  motionDurationFast: "0.05s",
  motionDurationMid: "0.1s",
  motionDurationSlow: "0.15s",
};

// The masthead is black in both modes, TUI-style: the selected item is
// inverted (light text block on black), hover is a dim fill.
const techMastheadMenu = {
  darkItemBg: "#0a0a0a",
  darkPopupBg: "#111110",
  darkItemColor: "#a6a69e",
  darkItemHoverBg: "#1f1f1d",
  darkItemHoverColor: "#edede8",
  darkItemSelectedBg: "#edede8",
  darkItemSelectedColor: "#0a0a0a",
};

const getTechnicalThemeConfig = (themeMode: ThemeMode): ThemeConfig => {
  const colorPrimary = themeMode === "dark" ? "#7b96ff" : "#1b3be0"; // engineering blue
  const modeTokens = themeMode === "dark" ? techDarkTokens : techLightTokens;
  const ink = modeTokens.colorText;

  return {
    algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary,
      colorLink: colorPrimary,
      ...techSharedTokens,
      ...modeTokens,
      // Dark mode uses a light accent, so "solid" surfaces (primary buttons,
      // colored tags) need dark text to keep contrast — the inverted look.
      ...(themeMode === "dark" ? { colorTextLightSolid: "#0a0a0a" } : {}),
    },
    components: {
      Layout: {
        headerBg: "#0a0a0a",
        bodyBg: modeTokens.colorBgLayout,
        footerBg: "transparent",
      },
      Menu: {
        ...techMastheadMenu,
        itemBg: modeTokens.colorBgContainer,
        popupBg: modeTokens.colorBgContainer,
        activeBarBorderWidth: 0,
        itemBorderRadius: 0,
        horizontalItemBorderRadius: 0,
      },
      Button: {
        fontWeight: 500,
        primaryShadow: "none",
        defaultShadow: "none",
        dangerShadow: "none",
      },
      Card: {
        headerBg: "transparent",
        colorBorderSecondary: modeTokens.colorBorderSecondary,
      },
      Table: {
        headerBg: themeMode === "dark" ? "#161613" : "#f0f0e9",
        headerColor: modeTokens.colorTextSecondary,
        rowHoverBg: themeMode === "dark" ? "#1c1c18" : "#f5f5ef",
        headerBorderRadius: 0,
        cellFontSize: 13,
      },
      Tabs: {
        inkBarColor: ink,
        itemColor: modeTokens.colorTextSecondary,
        itemSelectedColor: ink,
        itemHoverColor: ink,
      },
      Modal: {
        contentBg: modeTokens.colorBgElevated,
        headerBg: modeTokens.colorBgElevated,
      },
      Drawer: {
        colorBgElevated: modeTokens.colorBgElevated,
      },
      Dropdown: {
        colorBgElevated: modeTokens.colorBgElevated,
      },
      Popover: {
        colorBgElevated: modeTokens.colorBgElevated,
      },
      Select: {
        colorBgElevated: modeTokens.colorBgElevated,
        optionSelectedBg: themeMode === "dark" ? "#26261f" : "#edede6",
      },
      Segmented: {
        trackBg: themeMode === "dark" ? "#161613" : "#edede6",
        itemSelectedBg: modeTokens.colorBgContainer,
      },
      Tag: {
        defaultBg: themeMode === "dark" ? "#1c1c18" : "#f0f0e9",
        defaultColor: modeTokens.colorTextSecondary,
      },
      Tooltip: {
        colorBgSpotlight: themeMode === "dark" ? techDarkTokens.colorText : "#141414",
        colorTextLightSolid: themeMode === "dark" ? "#0a0a0a" : "#ffffff",
      },
      Breadcrumb: {
        itemColor: modeTokens.colorTextSecondary,
        linkColor: modeTokens.colorTextSecondary,
        linkHoverColor: ink,
        separatorColor: modeTokens.colorTextTertiary,
      },
      Alert: {
        defaultPadding: "8px 12px",
      },
      Pagination: {
        itemActiveBg: modeTokens.colorBgContainer,
      },
    },
  };
};

const darkThemeTokens = {
  // Backgrounds - rich dark, not pure black
  colorBgBase: "#0d1117",
  colorBgContainer: "#161b22",
  colorBgElevated: "#1c2128",
  colorBgLayout: "#0d1117",
  colorBgSpotlight: "#21262d",

  // Borders - subtle but visible
  colorBorder: "#30363d",
  colorBorderSecondary: "#21262d",

  // Text - high contrast
  colorText: "#e6edf3",
  colorTextSecondary: "#8b949e",
  colorTextTertiary: "#6e7681",
  colorTextQuaternary: "#484f58",

  // Fill colors
  colorFill: "#21262d",
  colorFillSecondary: "#30363d",
  colorFillTertiary: "#161b22",
  colorFillQuaternary: "#0d1117",

  // Split/divider
  colorSplit: "#21262d",
};

export const getThemeConfig = (colorScheme: ColorSchemeOption, themeMode: ThemeMode): ThemeConfig => {
  const colorPrimary = colorScheme === "default" ? "#1890ff" : "#722ED1";

  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }

  if (colorScheme === "technical") {
    return getTechnicalThemeConfig(themeMode);
  }

  if (themeMode === "dark") {
    const isTerrakube = colorScheme === "terrakube";
    return {
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary,
        ...darkThemeTokens,
        colorPrimaryBg: isTerrakube ? "#1a0a2e" : "#0d2942",
        colorPrimaryBgHover: isTerrakube ? "#2d1548" : "#113a5d",
      },
      components: {
        Layout: {
          headerBg: "#161b22",
          bodyBg: "#0d1117",
          footerBg: "#0d1117",
        },
        Menu: {
          darkItemBg: "#161b22",
          darkPopupBg: "#161b22",
          darkItemSelectedBg: "#21262d",
          darkItemHoverBg: "#21262d",
          itemBg: "#161b22",
          popupBg: "#161b22",
        },
        Card: {
          colorBgContainer: "#161b22",
          colorBorderSecondary: "#30363d",
        },
        Input: {
          colorBgContainer: "#0d1117",
          colorBorder: "#30363d",
        },
        Select: {
          colorBgContainer: "#0d1117",
          colorBgElevated: "#1c2128",
          optionSelectedBg: "#21262d",
        },
        Button: {
          defaultBg: "#21262d",
          defaultBorderColor: "#30363d",
          defaultColor: "#e6edf3",
        },
        Table: {
          colorBgContainer: "#161b22",
          headerBg: "#1c2128",
          rowHoverBg: "#21262d",
        },
        Modal: {
          contentBg: "#1c2128",
          headerBg: "#1c2128",
        },
        Drawer: {
          colorBgElevated: "#1c2128",
        },
        Dropdown: {
          colorBgElevated: "#1c2128",
        },
        Popover: {
          colorBgElevated: "#1c2128",
        },
        Segmented: {
          itemSelectedBg: "#30363d",
          trackBg: "#161b22",
        },
        Tabs: {
          itemColor: "#8b949e",
          itemSelectedColor: "#e6edf3",
          itemHoverColor: "#e6edf3",
        },
        Tag: {
          defaultBg: "#21262d",
          defaultColor: "#e6edf3",
        },
        Badge: {
          colorBgContainer: "#161b22",
        },
        Divider: {
          colorSplit: "#30363d",
        },
        Breadcrumb: {
          itemColor: "#8b949e",
          linkColor: "#8b949e",
          linkHoverColor: "#e6edf3",
          separatorColor: "#6e7681",
        },
        Typography: {
          colorText: "#e6edf3",
          colorTextSecondary: "#8b949e",
        },
        Form: {
          labelColor: "#e6edf3",
        },
        Alert: {
          colorText: "#e6edf3",
          defaultPadding: "8px 12px",
        },
        Checkbox: {
          colorBgContainer: "#0d1117",
          colorBorder: "#30363d",
        },
        Radio: {
          colorBgContainer: "#0d1117",
          colorBorder: "#30363d",
        },
        Pagination: {
          itemActiveBg: "#21262d",
          itemBg: "#0d1117",
        },
      },
    };
  }

  return {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary,
    },
    components: {
      Menu: {
        darkItemBg: "#1e2837",
        darkPopupBg: "#1e2837",
        darkSubMenuItemBg: "#1e2837",
      },
      Layout: {
        headerBg: "#1e2837",
      },
    },
  };
};

export const defaultColorScheme: ColorSchemeOption = "default";
export const defaultThemeMode: ThemeMode = "light";

// Export a default theme configuration using the default color scheme and theme mode
export const themeConfig = getThemeConfig(defaultColorScheme, defaultThemeMode);
