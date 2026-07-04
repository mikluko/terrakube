import { CSSProperties, ReactNode } from "react";
import "./technical-components.css";

type Props = {
  title?: string;
  detail?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
};

/** Technical empty state — muted uppercase "NO DATA" over the dotted field.
 *  ASCII, not illustration. */
export default function EmptyState({ title = "NO DATA", detail, action, style }: Props) {
  return (
    <div className="tk-empty-state" style={style}>
      <div className="tk-empty-state-glyph">── ⊘ ──</div>
      <div className="tk-empty-state-title">{title}</div>
      {detail && <div className="tk-empty-state-detail">{detail}</div>}
      {action}
    </div>
  );
}
