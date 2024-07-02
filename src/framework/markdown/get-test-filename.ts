import { TESTMATIC_ROOT_DIRNAME } from "../../const";
import { Test } from "../core";

const defaultProjectPath = `./${TESTMATIC_ROOT_DIRNAME}`;

export function getTestFilename(test: Test, projectPath = defaultProjectPath) {
  return `${projectPath}/tests/${test.name}.md`;
}
