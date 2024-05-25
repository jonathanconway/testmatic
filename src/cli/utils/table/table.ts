import { toAsciiTable } from "../ascii";

export function logTable<T extends object>(tableData: readonly T[]) {
  if (tableData.length === 0) {
    console.log("(No items)");
  } else {
    console.log(toAsciiTable(tableData));
  }
}
