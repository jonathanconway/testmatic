import { TESTMATIC_ROOT_DIRNAME } from "../../const";
import { Run, Test } from "../core";

const defaultProjectPath = `./${TESTMATIC_ROOT_DIRNAME}`;

export function getRunsFilepath(test: Test, projectPath = defaultProjectPath) {
  return `${projectPath}/runs/${test.name}`;
}

export function getRunFilepath(
  test: Test,
  run: Run,
  projectPath = defaultProjectPath
) {
  return `${projectPath}/runs/${test.name}/${run.dateTime}`;
}
