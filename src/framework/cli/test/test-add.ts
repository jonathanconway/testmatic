import { createCommand } from "commander";

import { CreateTestParams, Test, createTest, projectAddTest } from "../../core";
import { isValidationError } from "../../utils";
import { readProject, writeProject } from "../project.utils";
import { promptValue, promptValues } from "../prompt.utils";

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
  const project = readProject();

  const newTest = createTestFromArgsOrPrompts(args);

  const updatedProject = projectAddTest({ project, newTest });

  writeProject(updatedProject);
}

function createTestFromArgsOrPrompts(args: TestAddParameters): Test {
  const paramsFromArgs = args;

  const paramsFromPrompts = getTestAddParamsFromPrompts(paramsFromArgs);

  const params = {
    ...paramsFromArgs,
    ...paramsFromPrompts,
  };

  const createTestResult = createTest(params);

  if (isValidationError(createTestResult)) {
    throw createTestResult.message;
  }

  return createTestResult;
}

function getTestAddParamsFromPrompts(paramsSoFar: Partial<CreateTestParams>) {
  let params: Partial<CreateTestParams> = {};

  if (!paramsSoFar.title) {
    const title = getTestAddTitleFromPrompt();

    if (title === null) {
      return null;
    }

    params = {
      ...params,
      title,
    };
  }

  if (!paramsSoFar.steps) {
    const steps = getTestAddStepsFromPrompt();

    if (steps === null) {
      return null;
    }

    params = { ...params, steps };
  }

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
