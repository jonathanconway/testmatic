import { Test } from "../../core";

export function convertTestToTestOutputRow(test: Test) {
  return {
    title: test.title,
    doc: `./.testmatic/tests/${test.name}.md`,
  };
}
