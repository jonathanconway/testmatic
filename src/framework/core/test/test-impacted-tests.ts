import { Test, testGetTags } from ".";

import { ImpactItem } from "../impact";
import { getTagImpactedTests } from "../tag";

export function getTestImpactedTests({
  tests,
  test,
  depth,
}: {
  readonly tests: readonly Test[];
  readonly test: Test;
  readonly depth: number;
}): readonly ImpactItem[] {
  return testGetTags(test).flatMap((tag) =>
    getTagImpactedTests({ tests, tag, depth })
  );
}
