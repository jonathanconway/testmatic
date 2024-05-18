import { Run, Test } from "../core";

export function getRunsFilepath(test: Test) {
  return `./.testmatic/runs/${test.name}`;
}

export function getRunFilepath(test: Test, run: Run) {
  return `./.testmatic/runs/${test.name}/${run.dateTime}`;
}
