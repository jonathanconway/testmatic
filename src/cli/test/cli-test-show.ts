import chalk from "chalk";
import { createCommand } from "commander";

import {
  Step,
  Test,
  formatDateTimeString,
  getRunFilepath,
  getTagFilename,
  getTestFilename,
  isError,
  projectGetTestByNameOrTitle,
  projectMdRead,
  sentenceCase,
} from "../../framework";
import { logError, logHeading, logTable } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestShowParameter = string /* testNameOrTitle */;

export const cliTestShowCommand = createCommand("show")
  .description("Show the full details of a test")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestShow);

export function cliTestShow(testNameOrTitle: TestShowParameter) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    logError(getTestResult.message);
    return;
  }

  const test = getTestResult;

  logTitle(test);

  logDocFile(test);

  logDescription(test);

  logSteps(test);

  logLinks(test);

  logTags(test);

  logRuns(test);
}

function logTitle({ title }: Test) {
  logHeading(`Test: ${title}`, 1);
}

function logDocFile(test: Test) {
  console.log(`Doc: ${getTestFilename(test)}`);
  console.log();
}

function logDescription({ description }: Test) {
  if (description) {
    logHeading("Description", 2);

    console.log(description);
    console.log();
  }
}

function logSteps({ steps }: Test) {
  logHeading("Steps", 2);

  const testStepsTable = steps.map((step, index) => ({
    "#": (index + 1).toString(),
    step: formatStepText(step),
  }));

  logTable(testStepsTable);

  console.log();
}

function formatStepText(step: Step) {
  let stepText = step.text;
  for (const tag of step.tags) {
    stepText = stepText.replaceAll(
      `(${tag.title.toLowerCase()})`,
      chalk.greenBright(`(${tag.title.toLowerCase()})`)
    );
  }
  return stepText;
}

function logLinks({ links }: Test) {
  logHeading("Links", 2);

  const testLinksTable = links.map((link) => ({
    Name: link.title,
    URL: link.href,
  }));

  logTable(testLinksTable);

  console.log();
}

function logTags({ tags }: Test) {
  logHeading("Tags", 2);

  const testTagsTable = tags.map((tag) => ({
    name: tag.name,
    title: tag.title,
    doc: getTagFilename(tag),
  }));

  logTable(testTagsTable);

  console.log();
}

function logRuns(test: Test) {
  logHeading("Runs", 2);

  const testRunsTable = test.runs.map((run) => ({
    dateTime: formatDateTimeString(run.dateTime),
    result: run.result ? sentenceCase(run.result) : "-",
    folder: getRunFilepath(test, run),
  }));

  logTable(testRunsTable);

  console.log();
}
