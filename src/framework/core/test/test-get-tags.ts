import { Test } from "./test";

export function testGetTags(test: Test) {
  return [...test.tags, ...test.steps.flatMap((step) => step.tags)].uniq();
}
