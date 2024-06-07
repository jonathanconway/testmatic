import chalk from "chalk";

import { ImpactItem } from "../../../framework";

export function logImpacts(impacts: readonly ImpactItem[], indent: number = 0) {
  console.log(getImpactsList(impacts, indent));
}

function getImpactsList(
  impacts: readonly ImpactItem[],
  indent: number = 0
): string {
  if (impacts.length === 0) {
    return "(No items)\n";
  }

  const impactItems = impacts.map(
    (impact) => `${"  ".repeat(indent)}${
      indent === 0 ? "-" : "-->"
    } ${chalk.whiteBright(impact.item.title)} ${chalk.grey(
      `(${impact.item.name})`
    )} ${chalk.blueBright(`[${impact.itemType}]`)}
${getImpactsList(impact.items, indent + 1)}`
  );

  return impactItems.join("");
}
