import {
  ValidationError,
  createValidationErrorFromZodError,
} from "../../utils";
import { Link } from "../link";

import { Run } from "./run";
import { RunResult } from "./run-result";
import { runValidator } from "./run-validator";

export interface CreateRunParams {
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links?: ReadonlyArray<Link>;
  readonly recordings?: ReadonlyArray<string>;
}

export function createRun({
  dateTime,
  result,
  links = [],
  recordings = [],
}: CreateRunParams): Run | ValidationError {
  const run = {
    dateTime,
    result,
    links,
    recordings,
  };

  const runValidatorResult = runValidator.safeParse(run);
  if (!runValidatorResult.success) {
    return createValidationErrorFromZodError(runValidatorResult.error);
  }

  return run;
}
