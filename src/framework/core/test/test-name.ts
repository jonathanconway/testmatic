import { snakeCase } from "lodash";

import { Test } from "./test";

export type TestName = string;

export function generateTestName(test: Test): TestName {
  return snakeCase(test.title);
}
