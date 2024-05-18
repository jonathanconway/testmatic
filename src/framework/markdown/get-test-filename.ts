import { Test } from "../core";

export function getTestFilename(test: Test) {
  return `./.testmatic/tests/${test.name}.md`;
}
