import { createCommand } from "commander";
import { isError } from "lodash";

import {
  CreateTestParams,
  createTest,
  isCancelledError,
  projectAddNewTest,
  projectMdRead,
  projectMdWrite,
  throwIfError,
  throwIfResultWithDataError,
} from "../../framework";
import { logSuccess, promptValue, promptValues } from "../utils";

interface TestAddParameters {
  readonly title: string;
  readonly description?: string;
  readonly steps: readonly string[];
  readonly links: readonly string[];
}

export const cliTestAddCommand = createCommand("add")
  .description("Add a new test to the project")
  .option(
    "-t, --title <value>",
    `
Title of the test.
Also used to generate an underscored filename used to refer to the test in short-hand.
Titles must be unique.
Titles should briefly summarise the test steps.

Required - must be provided, either via prompt or command line.
`.trim()
  )
  .option(
    "-d, --description <value>",
    `
Description of the test.
Longer than the title, provides a more detailed summary of the test.

Tests can also include tags, enclosed in round brackets: (, ).
For further information, see 'testmatic tag help'.

Optional.
`.trim()
  )
  .option(
    "-s, --steps [steps...]",
    `
List of steps of the test.

Add each step in quotes separated by a space, e.g.: "step one" "step two"
Steps will be in the order that they are provided.

Required - at least one step must be provided, either via prompt or command line.
`.trim()
  )
  .option(
    "-l, --links [links...]",
    `
List of links to associate with the test.
For example, a deep link to the web page being tested or relevant documentation.

Add each link href in quotes separated by a space.
E.g.: "http://product.com/login" "http://wiki.com/login-flow".

Links can be prefixed with text separated by a pipe "|".
E.g. "Login page|http://product.com/login" "Login flow docs|http://wiki.com/login-flow"

Optional.
`.trim()
  )
  .action(cliTestAdd);

export function cliTestAdd(args: TestAddParameters) {
  const project = throwIfError(projectMdRead());

  const newTest = throwIfError(createTestFromArgsOrPrompts(args));

  const addTestResult = throwIfResultWithDataError(
    projectAddNewTest({ project, newTest })
  );

  const updatedProject = addTestResult;

  projectMdWrite(updatedProject.data);

  logSuccess(updatedProject.message);
}

function createTestFromArgsOrPrompts(args: TestAddParameters) {
  const paramsFromArgs = args;

  const paramsFromPrompts = getTestAddParamsFromPrompts(paramsFromArgs);

  if (isCancelledError(paramsFromPrompts)) {
    return paramsFromPrompts;
  }

  const params = {
    ...paramsFromArgs,
    ...paramsFromPrompts,
  } as CreateTestParams;

  const createTestResult = createTest(params);

  return createTestResult;
}

function getTestAddParamsFromPrompts(paramsSoFar: Partial<CreateTestParams>) {
  let params: Partial<CreateTestParams> = {};

  if (!paramsSoFar.title) {
    const getTestAddTitleFromPromptResult = getTestAddTitleFromPrompt();
    if (isError(getTestAddTitleFromPromptResult)) {
      return getTestAddTitleFromPromptResult;
    }

    const title = getTestAddTitleFromPromptResult;

    params = {
      ...params,
      title,
    };
  }

  if (!paramsSoFar.stepTexts) {
    const getTestAddStepsFromPromptResult = getTestAddStepsFromPrompt();
    if (isError(getTestAddStepsFromPromptResult)) {
      return getTestAddStepsFromPromptResult;
    }

    const stepTexts = getTestAddStepsFromPromptResult;

    params = { ...params, stepTexts };
  }

  console.log();

  return params;
}

function getTestAddTitleFromPrompt() {
  return promptValue({
    message: "Please enter test title: ",
    repeatIfEmpty: true,
  });
}

function getTestAddStepsFromPrompt() {
  return promptValues({
    message:
      "\nThank you!\n\nNow, please enter your steps, one-by-one.\n(Empty line to finish)\n",
  });
}
