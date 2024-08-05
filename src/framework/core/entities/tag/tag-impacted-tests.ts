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

  if (depth === 0) {
    return testsHavingTag.map((testHavingTag) => ({
      item: testHavingTag,
      itemType: "test",
      items: [],
    }));
  }

  const impactItems: ImpactItem[] = [];

  for (const test of testsHavingTag) {
    const testTags = testGetTags(test);
    const items = testTags.map(
      (testTag) =>
        ({
          item: testTag,
          itemType: "tag",
          items: getTagImpactedTests({ tests, tag: testTag, depth: depth - 1 }),
        } as ImpactItem)
    );

    impactItems.push({
      item: test,
      itemType: "test",
      items,
    });
  }

  return impactItems;
}

export function pruneImpactItems(
  impactItems: readonly ImpactItem[],
  uniqueItems: (Tag | Test)[] = []
): readonly ImpactItem[] {
  const filteredImpactItems = impactItems.filter(
    (impactItem) => !uniqueItems.includes(impactItem.item)
  );

  const mappedImpactItems = [];

  for (const impactItem of filteredImpactItems) {
    if (uniqueItems.includes(impactItem.item)) {
      continue;
    }
    uniqueItems.push(impactItem.item);

    const mappedImpactItem = {
      ...impactItem,
      items: pruneImpactItems(impactItem.items, uniqueItems),
    };
    mappedImpactItems.push(mappedImpactItem);

    uniqueItems.push(...mappedImpactItem.items.map((item) => item.item));
  }
  return mappedImpactItems;
}
