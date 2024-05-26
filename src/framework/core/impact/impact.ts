import { isNotNil } from "../../utils";
import { Tag } from "../tag";
import { Test } from "../test";

export interface ImpactItem {
  readonly item: Tag | Test;
  readonly itemType: "test" | "tag";
  readonly items: readonly ImpactItem[];
}

export function pruneImpacts(
  impacts: readonly ImpactItem[],
  uniqItems: (Tag | Test)[]
): readonly ImpactItem[] {
  const impactByItemNameAndType: Record<string, ImpactItem> = {};

  const impactItems = impacts.map((impact) => {
    uniqItems.push(impact.item);

    const items = pruneImpacts(
      impact.items.filter((subItem) => !uniqItems.includes(subItem.item)),
      uniqItems
    );

    return {
      ...impact,
      items,
    };
  });

  for (const impactItem of impactItems) {
    impactByItemNameAndType[impactItem.item.name + impactItem.itemType] =
      impactByItemNameAndType[impactItem.item.name + impactItem.itemType] ??
      impactItem;
  }

  return Object.values(impactByItemNameAndType);
}
