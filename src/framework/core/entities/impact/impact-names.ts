import { ImpactItem } from "./impact";

export function getItemAndSubItemNames(
  impactItems: readonly ImpactItem[]
): readonly string[] {
  return impactItems.flatMap((impactItem: ImpactItem) => [
    impactItem.item.name,
    ...getItemAndSubItemNames(impactItem.items),
  ]);
}
