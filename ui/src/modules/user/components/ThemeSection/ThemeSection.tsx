import { Card, Flex, Select, Space, Typography } from "antd";
import { ColorSchemeOption, ThemeMode } from "../../../../config/themeConfig";
import { useTheme } from "../../../../context/ThemeContext";
import "./ThemeSection.css";

const ColorBox = ({ color }: { color: string }) => (
  <span className="color-box" style={{ backgroundColor: color }}></span>
);

const ColorOption = ({ color, label }: { color: string; label: string }) => (
  <div className="color-option">
    <ColorBox color={color} />
    <span>{label}</span>
  </div>
);

export const ThemeSection = () => {
  const { colorScheme, themeMode, accent, setColorScheme, setThemeMode, setAccent } = useTheme();

  const handleColorSchemeChange = (value: ColorSchemeOption) => {
    setColorScheme(value);
  };

  const handleThemeModeChange = (value: ThemeMode) => {
    setThemeMode(value);
  };

  const accentSelectOptions = [
    {
      value: "engineering",
      label: (
        <div className="color-option">
          <ColorBox color={themeMode === "dark" ? "#8b9dff" : "#1b3be0"} />
          <span>Engineering blue</span>
        </div>
      ),
    },
    {
      value: "brand",
      label: (
        <div className="color-option">
          <ColorBox color={themeMode === "dark" ? "#b28aef" : "#722ed1"} />
          <span>Terrakube purple</span>
        </div>
      ),
    },
  ];

  const colorOptions = [
    {
      value: "technical",
      color: "#1b3be0",
      label: "Technical (Monospace precision-instrument look, the default)",
    },
    {
      value: "default",
      color: "#1890ff",
      label: "Classic (The stock Terrakube theme)",
    },
    {
      value: "terrakube",
      color: "#722ED1",
      label: "Classic purple (Stock theme in Terrakube logo colors)",
    },
  ];

  const themeModeOptions = [
    {
      value: "light",
      label: (
        <div className="color-option">
          <ColorBox color={colorScheme === "technical" ? "#f2f2ed" : "#ffffff"} />
          <span>{colorScheme === "technical" ? "Light (paper)" : "Light"}</span>
        </div>
      ),
    },
    {
      value: "dark",
      label: (
        <div className="color-option">
          <ColorBox color={colorScheme === "technical" ? "#0a0a0a" : "#000000"} />
          <span>{colorScheme === "technical" ? "Dark (phosphor)" : "Dark"}</span>
        </div>
      ),
    },
    // Blueprint is a Technical-scheme theme: white lines on cyanotype blue.
    ...(colorScheme === "technical"
      ? [
          {
            value: "blueprint",
            label: (
              <div className="color-option">
                <ColorBox color="#14295c" />
                <span>Blueprint (cyanotype)</span>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="theme-section">
      <Flex gap="middle" justify="space-between" align="center">
        <Flex vertical>
          <Typography.Title className="title">Theme Settings</Typography.Title>
          <Typography.Text type="secondary">
            Customize the appearance of Terrakube by selecting your preferred color scheme and theme mode.
          </Typography.Text>
        </Flex>
      </Flex>

      <Card className="theme-card">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Typography.Title level={5}>Color Scheme</Typography.Title>
            <Select
              value={colorScheme}
              onChange={handleColorSchemeChange}
              style={{ width: "100%" }}
              optionLabelProp="label"
              options={colorOptions.map((opt) => ({
                value: opt.value,
                label: <ColorOption color={opt.color} label={opt.value} />,
                children: <ColorOption color={opt.color} label={opt.label} />,
              }))}
            />
          </div>
          <div>
            <Typography.Title level={5}>Theme Mode</Typography.Title>
            <Select
              value={themeMode}
              onChange={handleThemeModeChange}
              style={{ width: "100%" }}
              options={themeModeOptions}
            />
          </div>
          {colorScheme === "technical" && themeMode !== "blueprint" && (
            <div>
              <Typography.Title level={5}>Accent</Typography.Title>
              <Select value={accent} onChange={setAccent} style={{ width: "100%" }} options={accentSelectOptions} />
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};
