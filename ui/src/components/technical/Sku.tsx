import { CSSProperties, ReactNode } from "react";
import "./technical-components.css";

type Props = {
  children: ReactNode;
  tone?: "default" | "muted" | "accent";
  style?: CSSProperties;
};

/** Dotted-border "specimen" chip — like a part number printed on a component.
 *  For IDs, versions, resource types, tags, SHAs. */
export default function Sku({ children, tone = "default", style }: Props) {
  return (
    <span className="tk-sku" data-tone={tone} style={style}>
      {children}
    </span>
  );
}
