import { byEquals } from "../../utils";
import { Step } from "../step";
import { Test } from "../test";

import { Tag } from "./tag";

export function getTestsHavingTag(tests: readonly Test[], tag: Tag) {
  return tests.filter((test) => test.tags.find((tag) => tag.name === tag.name));
}

export function getStepsHavingTag(steps: readonly Step[], tag: Tag) {
  return steps.filter((step) => step.tags.find(byEquals("name", tag.name)));
}

export function getTagsHavingTest(test: Test, tags: readonly Tag[]) {
  return tags.filter((tag) => test.tags.includes(tag));
}

function matchesNameOrTitleLowerCased(tagFilterValue: string) {
  return (tag: Tag) =>
    tag.name === tagFilterValue ||
    tag.title.toLowerCase() === tagFilterValue.toLowerCase();
}

export function testByTag(tagFilterValue: string) {
  return (test: Test) =>
    test.tags.some(matchesNameOrTitleLowerCased(tagFilterValue)) ||
    test.steps.some((step) =>
      step.tags.some(matchesNameOrTitleLowerCased(tagFilterValue))
    );
}

export function getTestsReferencingTag(tests: readonly Test[], tag: Tag) {
  return tests.filter(
    (test) =>
      test.tags.map((tag) => tag.name).includes(tag.name) ||
      test.steps.find((step) =>
        step.tags.map((tag) => tag.name).includes(tag.name)
      )
  );
}
