import max from "lodash/max";
import toUpper from "lodash/toUpper";

function getColWidths<T>(items: Array<T>) {
  return (col: string) =>
    max([
      ...items.map((item) => Object(item)?.[col]?.toString().length),
      col.length,
    ]);
}

export function toAsciiTable<T extends object>(items: Array<T>) {
  if (!items.length) {
    return "(empty)";
  }

  const cols = Object.keys(items[0]);
  const colNames = cols.map(toUpper);

  const colMaxWidths = cols.map(getColWidths(items));

  const header = colNames
    .map((colName, colNameIndex) => colName.padEnd(colMaxWidths[colNameIndex]))
    .join("  ");

  const rows = items
    .map((row) =>
      cols
        .map((col, colIndex) =>
          Object(row)?.[col]?.toString().padEnd(colMaxWidths[colIndex])
        )
        .join("  ")
    )
    .join("\n");

  return `\n${header}\n${rows}\n`;
}
