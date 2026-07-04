import { Button, ConfigProvider, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import { mgr } from "../../config/authConfig";
import { getUiRedirectUri } from "../../config/basePath";
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
  getThemeConfig,
  isValidThemeCombination,
  themeModeOptions,
} from "../../config/themeConfig";
import logo from "./logo.svg";
import "./Login.css";

const { Title, Text } = Typography;

const getSavedTheme = (): { scheme: ColorSchemeOption; mode: ThemeMode; accent: AccentOption } => {
  const storedScheme = localStorage.getItem("terrakube-color-scheme") as ColorSchemeOption | null;
  const scheme = storedScheme && colorSchemeOptions.includes(storedScheme) ? storedScheme : defaultColorScheme;
  const storedMode = localStorage.getItem("terrakube-theme-mode") as ThemeMode | null;
  const validMode = storedMode && themeModeOptions.includes(storedMode) ? storedMode : defaultThemeMode;
  const mode = isValidThemeCombination(scheme, validMode) ? validMode : "dark";
  const storedAccent = localStorage.getItem("terrakube-accent") as AccentOption | null;
  const accent = storedAccent && accentOptions.includes(storedAccent) ? storedAccent : defaultAccent;
  return { scheme, mode, accent };
};

const signIn = () => mgr.signinRedirect({ state: getUiRedirectUri() });

// The Technical login cycles themes in place: paper → phosphor → blueprint.
const TECHNICAL_MODES: ThemeMode[] = ["light", "dark", "blueprint"];
const MODE_NAMES: Record<ThemeMode, string> = { light: "PAPER", dark: "PHOSPHOR", blueprint: "BLUEPRINT" };

const Login = () => {
  const { scheme, accent } = getSavedTheme();
  const [mode, setMode] = useState<ThemeMode>(() => getSavedTheme().mode);

  useEffect(() => {
    applyThemeAttributes(scheme, mode, accent);
  }, [scheme, mode, accent]);

  const cycleMode = () => {
    const next = TECHNICAL_MODES[(TECHNICAL_MODES.indexOf(mode) + 1) % TECHNICAL_MODES.length];
    localStorage.setItem("terrakube-theme-mode", next);
    setMode(next);
  };

  return (
    <ConfigProvider theme={getThemeConfig(scheme, mode, accent)}>
      {scheme === "technical" ? <TechnicalLoginContent mode={mode} onCycleTheme={cycleMode} /> : <LoginContent />}
    </ConfigProvider>
  );
};

const LoginContent = () => {
  const { token } = theme.useToken();

  return (
    <div className="login-container" style={{ backgroundColor: token.colorBgLayout }}>
      <div className="login-card" style={{ backgroundColor: token.colorBgContainer }}>
        <img src={logo} alt="Terrakube" className="login-logo" />
        <Title level={3}>Sign in to Terrakube</Title>
        <Text type="secondary">Click below to continue with your identity provider.</Text>
        <Button type="primary" block size="large" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

const TechnicalLoginContent = ({ mode, onCycleTheme }: { mode: ThemeMode; onCycleTheme: () => void }) => {
  return (
    <div className="login-container">
      <div style={{ width: 360, maxWidth: "100%" }}>
        <div className="login-card">
          <div className="tk-login-band">
            <span>Terrakube // Sign in</span>
            <span className="tk-login-band-meta">
              <button type="button" className="tk-login-theme-chip" title="Cycle theme" onClick={onCycleTheme}>
                {MODE_NAMES[mode]}
              </button>
              <span>{window._env_.REACT_APP_TERRAKUBE_VERSION}</span>
            </span>
          </div>
          <div className="tk-login-body">
            <Text type="secondary">Continue with your identity provider.</Text>
            <Button type="primary" block onClick={signIn}>
              Authenticate
            </Button>
            <div className="tk-login-sso-row">
              <span>SSO // OIDC</span>
              <button type="button" className="tk-login-link" onClick={signIn}>
                Use provider →
              </button>
            </div>
          </div>
        </div>
        <div className="tk-login-strapline">Infrastructure control panel</div>
      </div>
    </div>
  );
};

export default Login;
