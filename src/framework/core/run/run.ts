import { Link } from "../link";

import { RunResult } from "./run-result";
import { RunStep } from "./run-step";

export interface Run {
  readonly dateTime: string;
  readonly description?: string;
  readonly result?: RunResult;
  readonly links: readonly Link[];
  readonly recordings: ReadonlyArray<string>;
  readonly steps: readonly RunStep[];
}
