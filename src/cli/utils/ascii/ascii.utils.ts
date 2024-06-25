import chalk from "chalk";
import { max, toUpper } from "lodash";

import { isNotNil } from "../../../framework/utils";

function getColWidths<T>(items: readonly T[]) {
  return (col: string) =>
    max([
      ...items.map((item) => Object(item)?.[col]?.toString().length),
      col.length,
    ]);
}

const COLUMN_SPACING = "   ";

export function toAsciiTable<T extends object>(
  items: T[] | readonly T[],
  columns?: readonly string[]
) {
  if (!items.length) {
    const columnNames = columns
      ? columns?.map(toUpper).join(COLUMN_SPACING) + "\n"
      : undefined;
    return [columnNames, "(No items)"].filter(isNotNil).join("\n");
  }

  const cols = Object.keys(items[0]);
  const colNames = columns?.map(toUpper) ?? cols.map(toUpper);

  const colMaxWidths = cols.map(getColWidths(items));

  const colNamesPadded = colNames.map((colName, colNameIndex) =>
    colName.padEnd(colMaxWidths[colNameIndex])
  );

  const header = colNamesPadded
    .map((colName) => chalk.grey(colName))
    .join(COLUMN_SPACING);

  const headerUnderlines = colNames
    .map((colName, colNameIndex) =>
      "-".repeat(colName.length).padEnd(colMaxWidths[colNameIndex])
    )
    .map((colName) => chalk.grey(colName))
    .join(COLUMN_SPACING);

  const rows = items
    .map((row) =>
      cols
        .map((col, colIndex) =>
          Object(row)?.[col]?.toString().padEnd(colMaxWidths[colIndex])
        )
        .join(COLUMN_SPACING)
    )
    .join("\n");

  return `${header}\n${headerUnderlines}\n${rows}`;
}
