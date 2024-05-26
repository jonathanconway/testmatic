import { uniq } from "lodash";

import { ImpactItem, pruneImpacts } from "../../../framework";

export function logImpacts(impacts: readonly ImpactItem[], indent: number = 0) {
  console.log();
  console.log(getImpactsList(impacts, indent));
}

function getImpactsList(
  impacts: readonly ImpactItem[],
  indent: number = 0
): string {
  if (impacts.length === 0) {
    return "";
  }

  return uniq(pruneImpacts(impacts, []))
    .map(
      (impact) => `${"  ".repeat(indent)}${indent === 0 ? "-" : "-->"} ${
        impact.item.title
      } (${impact.item.name}) [${impact.itemType}]
${getImpactsList(impact.items, indent + 1)}`
    )
    .join("");
}
