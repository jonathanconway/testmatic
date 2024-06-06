import { orderBy } from "lodash";

import { Test } from "../test";

export function projectGetTestRunLatest(test: Test) {
  return orderBy(test.runs, "dateTime", "desc")[0];
}
