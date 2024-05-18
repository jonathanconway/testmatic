import { Link } from "../link";
import { Timestamp } from "../timestamp";

export type RunResult = "passed" | "mixed" | "failed";

export interface Run {
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links: ReadonlyArray<Link>;
}

export interface CreateRunParams {
  readonly dateTime: Timestamp;
  readonly result: RunResult;
  readonly links: ReadonlyArray<Link>;
}

export function createRun({ dateTime, result, links }: CreateRunParams) {
  return {
    dateTime,
    result,
    links,
  };
}
