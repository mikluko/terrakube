import { Button, ConfigProvider, Typography, theme } from "antd";
import { useEffect } from "react";
import { mgr } from "../../config/authConfig";
import { getUiRedirectUri } from "../../config/basePath";
import {
  ColorSchemeOption,
  ThemeMode,
  applyThemeAttributes,
  colorSchemeOptions,
  defaultColorScheme,
  defaultThemeMode,
  getThemeConfig,
  isValidThemeCombination,
  themeModeOptions,
} from "../../config/themeConfig";
import logo from "./logo.svg";
import "./Login.css";

const { Title, Text } = Typography;

const getSavedTheme = (): { scheme: ColorSchemeOption; mode: ThemeMode } => {
  const storedScheme = localStorage.getItem("terrakube-color-scheme") as ColorSchemeOption | null;
  const scheme = storedScheme && colorSchemeOptions.includes(storedScheme) ? storedScheme : defaultColorScheme;
  const storedMode = localStorage.getItem("terrakube-theme-mode") as ThemeMode | null;
  const validMode = storedMode && themeModeOptions.includes(storedMode) ? storedMode : defaultThemeMode;
  const mode = isValidThemeCombination(scheme, validMode) ? validMode : "dark";
  return { scheme, mode };
};

const Login = () => {
  const { scheme, mode } = getSavedTheme();

  useEffect(() => {
    applyThemeAttributes(scheme, mode);
  }, [scheme, mode]);

  return (
    <ConfigProvider theme={getThemeConfig(scheme, mode)}>
      <LoginContent />
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
        <Button type="primary" block size="large" onClick={() => mgr.signinRedirect({ state: getUiRedirectUri() })}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
