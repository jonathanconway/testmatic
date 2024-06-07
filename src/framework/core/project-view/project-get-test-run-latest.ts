import { orderBy } from "lodash";

import { Run } from "../run";
import { Test } from "../test";

export function projectGetTestRunLatest(test: Test): Run | undefined {
  return orderBy(test.runs, "dateTime", "desc")?.[0];
}
