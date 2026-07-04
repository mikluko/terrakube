import { CSSProperties, ReactNode } from "react";
import "./technical-components.css";

type Tone = "warn" | "err" | "ok" | "run";

type Props = {
  tone?: Tone;
  title: ReactNode;
  detail?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
};

/** Alert band — solid-edged notice with a colored spine, like a stamped
 *  annotation on a ticket. Never a floating toast. */
export default function TechnicalAlert({ tone = "warn", title, detail, action, style }: Props) {
  return (
    <div className="tk-alert" data-tone={tone} style={style}>
      <div className="tk-alert-spine" />
      <div className="tk-alert-body">
        <span className="tk-alert-title">{title}</span>
        {detail && <span className="tk-alert-detail">{detail}</span>}
        {action && <span className="tk-alert-action">{action}</span>}
      </div>
    </div>
  );
}
