import orderBy from "lodash/orderBy";
import promptSync from "prompt-sync";

import { CreateTestParams, Test, addProjectTest, createTest } from "../../core";
import { isValidationError } from "../../utils";
import { parseSwitches } from "../args.utils";
import { readProject, writeProject } from "../project.utils";

const prompt = promptSync();

const stepSwitchNamePattern = new RegExp("step([0-9])");

function getTestAddParamsFromArgs(
  args: readonly string[]
): Partial<CreateTestParams> {
  const switches = parseSwitches(args);

  const title = switches.title;

  const stepSwitches = orderBy(
    Object.entries(switches).filter(([key]) =>
      Boolean(key.match(stepSwitchNamePattern))
    )
  );

  const stepSwitchesValues = stepSwitches.map(([, value]) => value.toString());

  const steps = stepSwitchesValues.length > 0 ? stepSwitchesValues : undefined;

  return {
    title,
    steps,
  };
}

function getTestAddTitleFromPrompt() {
  return prompt("Please enter test title: ");
}

function getTestAddStepsFromPrompt() {
  console.log(
    "\nThank you!\n\nNow, please enter your steps, one-by-one.\n(Empty line to finish)\n"
  );

  const steps = [];
  let stepIndex = 1;
  while (true) {
    const step = prompt(`${stepIndex}. `);
    if (step === "") {
      break;
    }

    steps.push(step);
    stepIndex++;
  }

  return steps;
}

function getTestAddParamsFromPrompts(paramsSoFar: Partial<CreateTestParams>) {
  let params: Partial<CreateTestParams> = {};

  if (!paramsSoFar.title) {
    const title = getTestAddTitleFromPrompt();
    params = {
      ...params,
      title,
    };
  }

  if (!paramsSoFar.steps) {
    const steps = getTestAddStepsFromPrompt();
    params = { ...params, steps };
  }

  return params;
}

function createTestFromArgsOrPrompts(args: readonly string[]): Test {
  const paramsFromArgs = getTestAddParamsFromArgs(args);

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

export function cliTestAdd(args: readonly string[]) {
  const projectView = readProject();

  const test = createTestFromArgsOrPrompts(args);

  const updatedProject = addProjectTest(projectView)(test);

  writeProject(updatedProject);
}
