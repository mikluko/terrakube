import { CSSProperties } from "react";
import { isActiveStatus, statusInfo } from "./status";
import "./technical-components.css";

type Props = {
  status?: string;
  label?: string;
  size?: "md" | "sm";
  style?: CSSProperties;
};

/** Status stamp — one solid saturated block with a 1px border, everywhere a
 *  status appears. In-flight statuses get the blinking block cursor. */
export default function StatusBadge({ status, label, size = "md", style }: Props) {
  const info = statusInfo(status);

  return (
    <span className="tk-status-badge" data-family={info.family} data-size={size} style={style}>
      {label ? label.toUpperCase() : info.label}
      {isActiveStatus(status) && <span className="tk-blink">▮</span>}
    </span>
  );
}
