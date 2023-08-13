import { max } from "lodash";

export function getArgsAfter(suffix: string) {
  return process.argv.slice(
    process.argv.findIndex((arg) => arg.endsWith(`cli/${suffix}`)) + 1
  );
}

export function convertToAsciiTable(rows: readonly Record<string, string>[]) {
  const columns = Object.keys(rows[0]);

  const longestCellLengthByColumn = Object.fromEntries(
    columns.map((column) => {
      const longestCellLength = max(rows.map((row) => row[column].length));
      return [column, longestCellLength];
    })
  );

  const headerText = columns
    .map((column) => {
      const maxLength = longestCellLengthByColumn[column];
      return column
        .padEnd(maxLength, " ")
        .substring(0, maxLength)
        .toUpperCase();
    })
    .join("  ");

  const rowTexts = rows.map((row) => {
    return columns
      .map((column) => {
        const maxLength = longestCellLengthByColumn[column];
        return row[column].padEnd(maxLength, " ").substring(0, maxLength);
      })
      .join("  ");
  });

  return [headerText, ...rowTexts].join("\n").trim();
}
