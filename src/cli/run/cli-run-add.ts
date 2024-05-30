import { exec } from "child_process";
import { createCommand } from "commander";

import {
  RunResult,
  createRun,
  getRunFilepath,
  isError,
  isValidationError,
  logError,
  nowDateTimeString,
  projectAddTestRun,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

type RunAddParameters = [
  string /* testNameOrTitle */,
  {
    readonly dateTime?: string;
    readonly result?: RunResult;
  }
];

export const cliRunAddCommand = createCommand("add")
  .description("Add a new run to the specified test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .option(
    "-d, --dateTime <value>",
    `
Date/tme of the run.

Optional.
`.trim()
  )
  .option(
    "-r, --result <value>",
    `
Result of the run, if known.
One of: "passed", "mixed" or "failed"

Optional.
`.trim()
  )
  .action(cliTagAdd);

export function cliTagAdd(...args: RunAddParameters) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const [testNameOrTitle] = args;

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    logError(getTestResult.message);
    return;
  }
  const test = getTestResult;

  const createRunResult = createRunFromArgs(args);
  if (isValidationError(createRunResult)) {
    logError(createRunResult.message);
    return;
  }
  const newRun = createRunResult;

  const addTestRunResult = projectAddTestRun({ project, test, newRun });
  if (isError(addTestRunResult)) {
    logError(addTestRunResult.message);
    return;
  }
  const updatedProject = addTestRunResult;

  projectMdWrite(updatedProject);

  exec(`open "${getRunFilepath(test, newRun)}"`);
}

function createRunFromArgs([
  ,
  { dateTime = nowDateTimeString(), result },
]: RunAddParameters) {
  const createTagResult = createRun({
    dateTime,
    result,
  });

  return createTagResult;
}
