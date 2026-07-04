import { ThemeConfig, theme } from "antd";
import type { AccentOption, ThemeMode } from "./themeConfig";

/* antd token values must stay literal hex: antd derives hover/active/disabled
   variants with color math at theme-build time, which cannot evaluate CSS
   var() references. Keep this palette in sync with
   src/styles/technical/tokens/colors.css — that file is the source of truth
   for everything rendered through CSS. */
interface TechnicalPalette {
  paper: string;
  paper2: string;
  paper3: string;
  paperRaised: string;
  ink: string;
  ink2: string;
  ink3: string;
  rule: string;
  ruleSoft: string;
  shadowColor: string;
  accent: string;
  onAccent: string;
  chrome: string;
  ok: string;
  err: string;
  warn: string;
  run: string;
}

const palettes: Record<ThemeMode, TechnicalPalette> = {
  light: {
    paper: "#f2f2ed",
    paper2: "#eae9e1",
    paper3: "#e0dfd4",
    paperRaised: "#f7f7f3",
    ink: "#141414",
    ink2: "#4c4c45",
    ink3: "#85847a",
    rule: "#141414",
    ruleSoft: "#c9c7ba",
    shadowColor: "#b9b7ab",
    accent: "#1b3be0",
    onAccent: "#f2f2ed",
    chrome: "#f7f7f3",
    ok: "#137752",
    err: "#e7040f",
    warn: "#ffb700",
    run: "#1b3be0",
  },
  dark: {
    paper: "#0a0a0a",
    paper2: "#151511",
    paper3: "#1e1e19",
    paperRaised: "#111110",
    ink: "#ececdf",
    ink2: "#b3b2a4",
    ink3: "#75746a",
    rule: "#4e4e44",
    ruleSoft: "#26261f",
    shadowColor: "#262620",
    accent: "#8b9dff",
    onAccent: "#0a0a0a",
    chrome: "#0d0d0d",
    ok: "#2ec98a",
    err: "#ff4d55",
    warn: "#ffc233",
    run: "#8b9dff",
  },
  blueprint: {
    paper: "#14295c",
    paper2: "#1a3168",
    paper3: "#223c78",
    paperRaised: "#182f64",
    ink: "#e6edfb",
    ink2: "#aabde2",
    ink3: "#7089ba",
    rule: "#55709f",
    ruleSoft: "#2c4478",
    shadowColor: "#0c1c44",
    accent: "#f4f8ff",
    onAccent: "#14295c",
    chrome: "#0b1a3e",
    ok: "#2ec98a",
    err: "#ff6b70",
    warn: "#ffc233",
    run: "#7fd4ff",
  },
};

const FONT_MONO = '"Berkeley Mono", "TX-02", "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace';

/* Brand accent (Terrakube purple) mirrors [data-scheme="brand"] in
   tokens/colors.css — defined for light and dark only; blueprint keeps its
   annotation-white accent. */
const brandAccent: Partial<Record<ThemeMode, { accent: string; onAccent: string; run: string }>> = {
  light: { accent: "#722ed1", onAccent: "#f2f2ed", run: "#722ed1" },
  dark: { accent: "#b28aef", onAccent: "#0a0a0a", run: "#b28aef" },
};

export const getTechnicalThemeConfig = (themeMode: ThemeMode, accent: AccentOption = "engineering"): ThemeConfig => {
  const brand = accent === "brand" ? brandAccent[themeMode] : undefined;
  const p = brand ? { ...palettes[themeMode], ...brand } : palettes[themeMode];
  const hardShadowBtn = `2px 2px 0 ${p.shadowColor}`;
  const hardShadowCard = `4px 4px 0 ${p.shadowColor}`;
  const hardShadowModal = `6px 6px 0 ${p.shadowColor}`;

  return {
    algorithm: themeMode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      borderRadius: 0,
      fontFamily: FONT_MONO,
      fontSize: 13,
      motion: false,

      colorPrimary: p.accent,
      colorLink: p.accent,
      colorInfo: p.run,
      colorSuccess: p.ok,
      colorError: p.err,
      colorWarning: p.warn,

      colorBgBase: p.paper,
      colorBgLayout: p.paper,
      colorBgContainer: p.paperRaised,
      colorBgElevated: p.paperRaised,
      colorBgSpotlight: p.ink,

      colorText: p.ink,
      colorTextSecondary: p.ink2,
      colorTextTertiary: p.ink3,
      colorTextQuaternary: p.ink3,

      colorBorder: p.rule,
      colorBorderSecondary: p.ruleSoft,
      colorSplit: p.ruleSoft,

      controlHeight: 30,
      controlHeightSM: 24,

      boxShadow: hardShadowCard,
      boxShadowSecondary: hardShadowCard,
    },
    components: {
      Layout: {
        headerBg: p.chrome,
        bodyBg: p.paper,
        footerBg: p.paper,
        headerHeight: 44,
      },
      Menu: {
        itemBg: p.chrome,
        popupBg: p.paperRaised,
        darkItemBg: p.chrome,
        darkPopupBg: p.paperRaised,
      },
      Button: {
        defaultBg: p.paperRaised,
        defaultBorderColor: p.rule,
        defaultColor: p.ink,
        primaryShadow: hardShadowBtn,
        defaultShadow: hardShadowBtn,
        dangerShadow: hardShadowBtn,
        fontWeight: 700,
      },
      Card: {
        colorBorderSecondary: p.rule,
        headerBg: p.paperRaised,
      },
      Table: {
        headerBg: p.paper2,
        headerColor: p.ink,
        rowHoverBg: p.paper3,
        borderColor: p.ruleSoft,
        headerSplitColor: "transparent",
      },
      Modal: {
        contentBg: p.paperRaised,
        headerBg: p.paperRaised,
        boxShadow: hardShadowModal,
      },
      Drawer: {
        colorBgElevated: p.paperRaised,
      },
      Dropdown: {
        colorBgElevated: p.paperRaised,
        boxShadowSecondary: hardShadowCard,
      },
      Popover: {
        colorBgElevated: p.paperRaised,
      },
      Input: {
        colorBgContainer: p.paperRaised,
        activeShadow: hardShadowBtn,
      },
      Select: {
        colorBgContainer: p.paperRaised,
        colorBgElevated: p.paperRaised,
        optionSelectedBg: p.ink,
        optionSelectedColor: p.paper,
      },
      Checkbox: {
        colorBgContainer: p.paperRaised,
      },
      Radio: {
        colorBgContainer: p.paperRaised,
      },
      Tabs: {
        inkBarColor: "transparent",
        itemColor: p.ink2,
        itemSelectedColor: p.ink,
        itemHoverColor: p.ink,
      },
      Tag: {
        defaultBg: p.paper2,
        defaultColor: p.ink,
      },
      Segmented: {
        itemSelectedBg: p.ink,
        itemSelectedColor: p.paper,
        trackBg: p.paper2,
      },
      Tooltip: {
        colorBgSpotlight: p.ink,
        colorTextLightSolid: p.paper,
      },
      Breadcrumb: {
        itemColor: p.ink2,
        linkColor: p.ink2,
        linkHoverColor: p.ink,
        separatorColor: p.ink3,
      },
      Pagination: {
        itemActiveBg: p.ink,
        itemBg: p.paperRaised,
      },
    },
  };
};
