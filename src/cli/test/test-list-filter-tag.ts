import { Test, testByTag } from "../../framework";

export function filterByArgsTag({
  tests,
  tagFilterValue,
}: {
  readonly tests: readonly Test[];
  readonly tagFilterValue?: string;
}): readonly Test[] {
  if (!tagFilterValue) {
    return tests;
  }

  let filteredTests = [...tests];

  filteredTests = filteredTests.filter(testByTag(tagFilterValue?.trim()));

  return filteredTests;
}
