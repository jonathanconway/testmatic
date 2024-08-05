import { exec } from "child_process";
import { createCommand } from "commander";

import {
  RunResult,
  Test,
  createRun,
  getRunFilepath,
  nowDateTimeString,
  projectAddTestRun,
  projectGetTestByNameOrTitle,
  projectMdRead,
  projectMdWrite,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

type RunAddParameters = [
  string /* lookupTestNameOrTitle */,
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
  const project = throwIfError(projectMdRead());

  const [lookupTestNameOrTitle] = args;

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle,
    })
  );

  const newRun = throwIfError(createRunFromArgs({ test, args }));

  const { data: updatedProject } = throwIfResultWithDataError(
    projectAddTestRun({
      project,
      lookupTestNameOrTitle,
      newRun,
    })
  );

  projectMdWrite(updatedProject);

  exec(`open "${getRunFilepath(test, newRun)}"`);
}

function createRunFromArgs({
  test,
  args,
}: {
  readonly test: Test;
  readonly args: RunAddParameters;
}) {
  const [, { dateTime = nowDateTimeString(), result }] = args;

  const createTagResult = createRun({
    test,
    dateTime,
    result,
  });

  return createTagResult;
}
