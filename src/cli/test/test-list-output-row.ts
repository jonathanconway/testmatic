import { Test } from "../../framework";

export function convertTestToOutputRow(test: Test) {
  return {
    title: test.title.trimWithEllipsis(60),
    name: test.name,
  };
}
