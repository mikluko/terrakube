export type StatusFamily = "ok" | "err" | "run" | "warn" | "neutral";

export interface StatusInfo {
  family: StatusFamily;
  label: string;
}

/* One map for every status enum the API emits (JobStatus and ad-hoc strings
   like "NeverExecuted"). Keys are normalized: lowercased, separators stripped.
   Families bind to the --ok/--err/--run/--warn/--neutral token triads. */
const STATUS_MAP: Record<string, StatusInfo> = {
  completed: { family: "ok", label: "COMPLETED" },
  nochanges: { family: "ok", label: "NO CHANGES" },
  approved: { family: "ok", label: "APPROVED" },
  applied: { family: "ok", label: "APPLIED" },
  successful: { family: "ok", label: "SUCCESSFUL" },

  failed: { family: "err", label: "FAILED" },
  rejected: { family: "err", label: "REJECTED" },
  errored: { family: "err", label: "ERRORED" },

  running: { family: "run", label: "RUNNING" },
  planning: { family: "run", label: "PLANNING" },
  applying: { family: "run", label: "APPLYING" },

  waitingapproval: { family: "warn", label: "WAITING APPROVAL" },
  notexecuted: { family: "warn", label: "NOT EXECUTED" },
  planned: { family: "warn", label: "PLANNED" },
  locked: { family: "warn", label: "LOCKED" },

  pending: { family: "neutral", label: "PENDING" },
  queue: { family: "neutral", label: "QUEUED" },
  queued: { family: "neutral", label: "QUEUED" },
  cancelled: { family: "neutral", label: "CANCELLED" },
  unknown: { family: "neutral", label: "UNKNOWN" },
  neverexecuted: { family: "neutral", label: "NEVER EXECUTED" },
};

/** Humanize a raw enum so camelCase never leaks into UI copy:
 *  "waitingApproval" → "WAITING APPROVAL". */
export const humanizeStatus = (raw: unknown): string => {
  const text = String(raw ?? "").trim();
  if (!text) {
    return "UNKNOWN";
  }
  return text
    .replace(/[_-]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .toUpperCase();
};

const keyOf = (status: unknown): string =>
  String(status ?? "")
    .replace(/[\s_-]/g, "")
    .toLowerCase();

export const statusInfo = (status: unknown): StatusInfo =>
  STATUS_MAP[keyOf(status)] ?? { family: "neutral", label: humanizeStatus(status) };

/* Statuses that get the blinking block cursor — work in flight. */
const ACTIVE_STATUSES = new Set(["running", "planning", "applying"]);

export const isActiveStatus = (status: unknown): boolean => ACTIVE_STATUSES.has(keyOf(status));
