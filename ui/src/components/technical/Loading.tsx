import { CSSProperties } from "react";
import "./technical-components.css";

type Props = {
  label?: string;
  style?: CSSProperties;
};

/** Loading plate — the system's only motion: a blinking block cursor.
 *  Never a spinner. */
export default function Loading({ label = "LOADING", style }: Props) {
  return (
    <div className="tk-loading" style={style}>
      {label} <span className="tk-blink">▮</span>
    </div>
  );
}
