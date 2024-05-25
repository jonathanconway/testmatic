import { Test } from "../../framework";

export function convertTestToTestOutputRow(test: Test) {
  return {
    title: test.title,
    name: test.name,
    doc: `./.testmatic/tests/${test.name}.md`,
  };
}
