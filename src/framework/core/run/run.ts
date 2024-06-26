import { Link } from "../link";

import { RunResult } from "./run-result";

export interface Run {
  readonly dateTime: string;
  readonly description?: string;
  readonly result?: RunResult;
  readonly links: ReadonlyArray<Link>;
  readonly recordings: ReadonlyArray<string>;
}
