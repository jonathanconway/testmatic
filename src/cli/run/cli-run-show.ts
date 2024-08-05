import { createCommand } from "commander";

import { TESTMATIC_ROOT_DIRNAME } from "../../const";
import {
  Run,
  Test,
  formatDateTimeString,
  getRunFiles,
  projectGetTestByNameOrTitle,
  projectGetTestRunByDateTimeOrLatest,
  projectMdRead,
  sentenceCase,
  throwIfError,
} from "../../framework";
import { runResultEmoji } from "../../framework/core/entities/run/run-result-emoji";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { formatStepText } from "../test/format-step-text";
import { logHeading, logTable } from "../utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunShowParameter = [
  string /* testNameOrTitle */,
  string /* runDateTime */
];

export const cliRunShowCommand = createCommand("show")
  .description("Show the full details of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunShow);

export function cliRunShow(
  ...[lookupTestNameOrTitle, lookupRunDateTime]: RunShowParameter
) {
  const project = throwIfError(projectMdRead());

  const test = throwIfError(
    projectGetTestByNameOrTitle({
      project,
      lookupTestNameOrTitle,
    })
  );

  const run = throwIfError(
    projectGetTestRunByDateTimeOrLatest({
      project,
      test,
      lookupTestNameOrTitle,
      lookupRunDateTime,
    })
  );

  const files = getRunFiles({ test, run });

  logTitle({ test, run });

  logFilePath(run);

  logRunResult(run);

  logSteps(run);

  logFiles(files);
}

function logTitle({ test, run }: { test: Test; run: Run }) {
  const dateTimeFormatted = formatDateTimeString(run.dateTime);
  const title = `Test: ${test.title} – Run: ${dateTimeFormatted}`;

  logHeading(title, 1);
}

function logFilePath(run: Run) {
  console.log(
    `File: ./${TESTMATIC_ROOT_DIRNAME}/runs/${test.name}/${run.dateTime}/${run.dateTime}.md`
  );
  console.log();
}

function logSteps({ steps }: Run) {
  logHeading("Steps", 2);

  const testStepsTable = steps.map((step, index) => ({
    Completed: step.isCompleted ? "✅" : " ",
    "#": (index + 1).toString(),
    step: formatStepText(step),
  }));

  logTable(testStepsTable);

  console.log();
}

function logRunResult(run: Run) {
  console.log(
    `Result: ${runResultEmoji(run.result)} ${
      run.result ? sentenceCase(run.result) : "(No result)"
    }`
  );
  console.log();
}

function logFiles(files: string[]) {
  logHeading("Files", 2);

  // const filesTable = files.map((file) => ({ file }));

  console.log(files.join("\n"));

  console.log();
}
