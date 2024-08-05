import { DateTime } from "../date-time";
import { Link } from "../link";

import { RunResult } from "./run-result";
import { RunStep } from "./run-step";

export interface Run {
  //  todo: change all dateTime types to DateTime
  readonly dateTime: DateTime;
  readonly description?: string;
  readonly result?: RunResult;
  readonly links: readonly Link[];
  readonly recordings: ReadonlyArray<string>;
  readonly steps: readonly RunStep[];
}

export const RUN_DATE_TIME_LATEST = "RUN_DATE_TIME_LATEST";

export type RunDateTimeLatest = typeof RUN_DATE_TIME_LATEST;
