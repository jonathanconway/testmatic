import { Link } from "../link";

export type RunResult = "passed" | "mixed" | "failed";

export interface Run {
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links: ReadonlyArray<Link>;
}

export interface CreateRunParams {
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links?: ReadonlyArray<Link>;
}

export function createRun({
  dateTime,
  result,
  links = [],
}: CreateRunParams): Run {
  return {
    dateTime,
    result,
    links,
  };
}
