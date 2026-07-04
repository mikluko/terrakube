import { CSSProperties, ReactNode } from "react";
import "./technical-components.css";

type Tone = "ok" | "err" | "warn" | "run" | "neutral";

type Summary = {
  add?: number;
  change?: number;
  destroy?: number;
};

type Props = {
  title?: string;
  meta?: ReactNode;
  tone?: Tone;
  running?: boolean;
  summary?: Summary;
  maxHeight?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
};

/** The hero: machine output as a printed job ticket. Labeled title band on a
 *  colored wash strip, hard rule beneath, colored spine down the left edge,
 *  hard offset shadow. Body is the caller's rendered log (ANSI terminal,
 *  structured plan). */
export default function LogPanel({
  title = "LOG // OUTPUT",
  meta,
  tone = "neutral",
  running = false,
  summary,
  maxHeight,
  children,
  style,
}: Props) {
  return (
    <div className="tk-log-panel" data-tone={tone} style={style}>
      <div className="tk-log-panel-spine" />
      <div className="tk-log-panel-main">
        <div className="tk-log-panel-band">
          <span className="tk-log-panel-title">{title}</span>
          {meta && <span className="tk-log-panel-meta">{meta}</span>}
        </div>
        <div className="tk-log-panel-body" style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
          {children}
          {running && (
            <div className="tk-log-panel-cursor">
              <span className="tk-blink">▮</span>
            </div>
          )}
        </div>
        {summary && (
          <div className="tk-log-panel-summary">
            <span data-kind="add">+ {summary.add ?? 0} TO CREATE</span>
            <span data-kind="change">~ {summary.change ?? 0} TO CHANGE</span>
            <span data-kind="destroy">− {summary.destroy ?? 0} TO DESTROY</span>
          </div>
        )}
      </div>
    </div>
  );
}
