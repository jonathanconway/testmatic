import orderBy from "lodash/orderBy";

import { Test } from "../test";

export function projectGetTestRunLatest(test: Test) {
  return orderBy(test.runs, "dateTime", "desc")[0];
}
