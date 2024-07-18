import {
  ValidationError,
  createValidationErrorFromZodError,
  stringifyDateTime,
} from "../../utils";
import { Link } from "../link";
import { Test } from "../test";

import { Run } from "./run";
import { RunResult } from "./run-result";
import { runValidator } from "./run-validator";

export interface CreateRunParams {
  readonly test: Test;
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links?: ReadonlyArray<Link>;
  readonly recordings?: ReadonlyArray<string>;
}

export function createRun({
  test,
  dateTime,
  result,
  links = [],
  recordings = [],
}: CreateRunParams): Run | ValidationError {
  const steps = test.steps.map((step) => ({ ...step, isCompleted: false }));

  const run = {
    dateTime,
    result,
    links,
    recordings,
    steps,
  };

  const runValidatorResult = runValidator.safeParse(run);
  if (!runValidatorResult.success) {
    return createValidationErrorFromZodError(runValidatorResult.error);
  }

  return run;
}

export interface CreateRunNowParams {
  readonly test: Test;
}
export function createRunNow({ test }: CreateRunNowParams) {
  const dateTime = stringifyDateTime(new Date());
  return createRun({
    test,
    dateTime,
  });
}
