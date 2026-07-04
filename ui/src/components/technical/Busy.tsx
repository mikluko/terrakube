import { ReactNode } from "react";
import Loading from "./Loading";
import "./technical-components.css";

type Props = {
  busy: boolean;
  label?: string;
  children: ReactNode;
};

/** Busy overlay — keeps children mounted (form state survives) and stamps a
 *  Loading plate over them while an operation is in flight. The technical
 *  replacement for antd's wrapping <Spin spinning>. */
export default function Busy({ busy, label = "Working", children }: Props) {
  return (
    <div className="tk-busy" data-busy={busy || undefined}>
      {children}
      {busy && (
        <div className="tk-busy-overlay">
          <Loading label={label} />
        </div>
      )}
    </div>
  );
}
