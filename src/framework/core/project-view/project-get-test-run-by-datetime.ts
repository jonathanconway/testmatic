import { Test } from "../test";

export function projectGetTestRunByDateTime(test: Test, dateTime: string) {
  return test.runs.find((run) => run.dateTime === dateTime);
}
