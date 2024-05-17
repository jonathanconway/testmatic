import { randomUUID } from "crypto";
import { Timestamp } from "../../cli/timestamp";
import { Link } from "../link";

export type RunResult = "passed" | "mixed" | "failed";

export interface Run {
  readonly id: string;
  readonly dateTime: Timestamp;
  readonly result: RunResult;
  readonly links: ReadonlyArray<Link>;
}

export interface CreateRunParams {
  readonly dateTime: Timestamp;
  readonly result: RunResult;
  readonly links: ReadonlyArray<Link>;
}

export function createRun({ dateTime, result, links }: CreateRunParams) {
  return {
    id: randomUUID(),
    dateTime,
    result,
    links,
  };
}
