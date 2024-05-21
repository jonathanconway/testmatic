import { exec } from "child_process";
import { createCommand } from "commander";

import {
  Run,
  RunResult,
  createRun,
  projectAddTestRun,
  projectGetTestByNameOrTitle,
} from "../../core";
import { getRunFilepath } from "../../markdown";
import { isValidationError, nowDateTimeString } from "../../utils";
import { readProject, writeProject } from "../project.utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

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
  const project = readProject();

  const [testNameOrTitle] = args;

  const test = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });

  const newRun = createRunFromArgs(args);

  const updatedProject = projectAddTestRun({ project, test, newRun });

  writeProject(updatedProject);

  exec(`open "${getRunFilepath(test, newRun)}"`);
}

function createRunFromArgs([
  ,
  { dateTime = nowDateTimeString(), result },
]: RunAddParameters): Run {
  const createTagResult = createRun({
    dateTime,
    result,
  });

  if (isValidationError(createTagResult)) {
    throw createTagResult.message;
  }

  return createTagResult;
}
