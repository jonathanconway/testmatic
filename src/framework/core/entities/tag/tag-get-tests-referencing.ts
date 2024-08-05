import { Test } from "../test";

import { Tag } from "./tag";

// remove, replace with project fn
export function getTestsReferencingTag(tests: readonly Test[], tag: Tag) {
  return tests.filter(
    (test) =>
      test.tags.map((tag) => tag.name).includes(tag.name) ||
      test.steps.find((step) =>
        step.tags.map((tag) => tag.name).includes(tag.name)
      )
  );
}
