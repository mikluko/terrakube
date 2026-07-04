import { JobStatus } from "../../../domain/types";
import { humanizeStatus, isActiveStatus, statusInfo } from "../status";

describe("statusInfo", () => {
  it.each([
    [JobStatus.Completed, "ok", "COMPLETED"],
    [JobStatus.NoChanges, "ok", "NO CHANGES"],
    [JobStatus.Approved, "ok", "APPROVED"],
    [JobStatus.Failed, "err", "FAILED"],
    [JobStatus.Rejected, "err", "REJECTED"],
    [JobStatus.Running, "run", "RUNNING"],
    [JobStatus.WaitingApproval, "warn", "WAITING APPROVAL"],
    [JobStatus.NotExecuted, "warn", "NOT EXECUTED"],
    [JobStatus.Pending, "neutral", "PENDING"],
    [JobStatus.Queue, "neutral", "QUEUED"],
    [JobStatus.Cancelled, "neutral", "CANCELLED"],
    [JobStatus.Unknown, "neutral", "UNKNOWN"],
  ])("maps JobStatus %s to %s family with label %s", (status, family, label) => {
    expect(statusInfo(status)).toEqual({ family, label });
  });

  it("maps the ad-hoc NeverExecuted string", () => {
    expect(statusInfo("NeverExecuted")).toEqual({ family: "neutral", label: "NEVER EXECUTED" });
  });

  it("normalizes case and separators", () => {
    expect(statusInfo("Waiting_Approval")).toEqual({ family: "warn", label: "WAITING APPROVAL" });
    expect(statusInfo("no-changes")).toEqual({ family: "ok", label: "NO CHANGES" });
  });

  it("never leaks camelCase for unknown enums", () => {
    expect(statusInfo("somethingNewFromApi")).toEqual({
      family: "neutral",
      label: "SOMETHING NEW FROM API",
    });
  });

  it("treats missing status as unknown", () => {
    expect(statusInfo(undefined)).toEqual({ family: "neutral", label: "UNKNOWN" });
    expect(statusInfo("")).toEqual({ family: "neutral", label: "UNKNOWN" });
  });
});

describe("humanizeStatus", () => {
  it("splits camelCase and uppercases", () => {
    expect(humanizeStatus("waitingApproval")).toBe("WAITING APPROVAL");
  });

  it("handles snake and kebab separators", () => {
    expect(humanizeStatus("not_executed")).toBe("NOT EXECUTED");
    expect(humanizeStatus("no-changes")).toBe("NO CHANGES");
  });
});

describe("isActiveStatus", () => {
  it("marks in-flight statuses", () => {
    expect(isActiveStatus(JobStatus.Running)).toBe(true);
    expect(isActiveStatus("planning")).toBe(true);
    expect(isActiveStatus("applying")).toBe(true);
  });

  it("does not mark settled statuses", () => {
    expect(isActiveStatus(JobStatus.Completed)).toBe(false);
    expect(isActiveStatus(JobStatus.Pending)).toBe(false);
    expect(isActiveStatus(undefined)).toBe(false);
  });
});
