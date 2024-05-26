import { uniq, without } from "lodash";

import { ImpactItem } from "../impact";
import { Test, testGetTags } from "../test";

import { Tag } from "./tag";

export function getTagImpactedTests({
  tests,
  tag,
  depth,
}: {
  readonly tests: readonly Test[];
  readonly tag: Tag;
  readonly depth: number;
}): readonly ImpactItem[] {
  const testsHavingTag = tests.filter(
    (test) =>
      test.tags.includes(tag) ||
      test.steps.find((step) => step.tags.includes(tag))
  );

  if (depth > 0) {
    const nextLevelTags = testsHavingTag
      .flatMap(testGetTags)
      .uniq()
      .without(tag);

    const impacts: readonly ImpactItem[] = nextLevelTags.map(
      (nextLevelTag) => ({
        item: nextLevelTag,
        itemType: "tag",
        items: getTagImpactedTests({
          tests,
          tag: nextLevelTag,
          depth: depth - 1,
        }),
      })
    );
    return impacts;
  } else {
    return tests.map((test) => ({
      item: test,
      itemType: "test",
      items: [],
    }));
  }
}
