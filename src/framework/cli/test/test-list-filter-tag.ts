import { Test, testByTag } from "../../core";

export function filterByArgsTag(
  tests: readonly Test[],
  tagFilterValue?: string
): readonly Test[] {
  if (!tagFilterValue) {
    return tests;
  }

  let filteredTests = [...tests];

  filteredTests = filteredTests.filter(testByTag(tagFilterValue?.trim()));

  return filteredTests;
}
