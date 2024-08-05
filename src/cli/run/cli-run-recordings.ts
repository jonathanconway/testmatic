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
import { logHeading } from "../utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunRecordingsParameter = [
  string /* testNameOrTitle */,
  string /* runDateTime */
];

export const cliRunShowCommand = createCommand("recordings")
  .description("Show a list of recordings for a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunShow);

export function cliRunShow(
  ...[lookupTestNameOrTitle, lookupRunDateTime]: RunRecordingsParameter
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
      lookupRunDateTime,
      lookupTestNameOrTitle,
    })
  );

  const files = getRunFiles({ test, run });

  logTitle({ test, run });

  console.log(
    `File: ./${TESTMATIC_ROOT_DIRNAME}/runs/${test.name}/${run.dateTime}/${run.dateTime}.md`
  );
  console.log();

  console.log(
    `Result: ${runResultEmoji(run.result)} ${
      run.result ? sentenceCase(run.result) : "(No result)"
    }`
  );
  console.log();

  logFiles(files);
}

function logTitle({ test, run }: { test: Test; run: Run }) {
  const dateTimeFormatted = formatDateTimeString(run.dateTime);
  const title = `Test: ${test.title} – Run: ${dateTimeFormatted}`;

  logHeading(title, 1);
}

function logFiles(files: string[]) {
  logHeading("Files", 2);

  // const filesTable = files.map((file) => ({ file }));

  console.log(files.join("\n"));

  console.log();
}
