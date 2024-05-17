import { byEquals } from "../../utils";
import { Step } from "../step";
import { Test } from "../test";

import { Tag } from "./tag";

export function getTestsHavingTag(tests: readonly Test[], tag: Tag) {
  return tests.filter((test) => test.tags.includes(tag));
}

export function getStepsHavingTag(steps: readonly Step[], tag: Tag) {
  return steps.filter((step) => step.tags.find(byEquals("name", tag.name)));
}

export function getTagsHavingTest(test: Test, tags: readonly Tag[]) {
  return tags.filter((tag) => test.tags.includes(tag));
}
