import { createCommand } from "commander";

import { isDateTimeString, throwIfError } from "../../framework";
import { updateRunStepCompleted } from "../../framework/file-commands/run/update-run-step-completed";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { logError } from "../utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_RUN_STEP_IS_COMPLETED } from "./param-run-step-completed";
import { PARAM_RUN_STEP_NUMBER } from "./param-run-step-number";

type RunOpenParameter = [
  string /* lookupTestNameOrTitle */,
  string | undefined /* lookupRunDateTimeOrStepNumber */,
  string | undefined /* lookupRunStepNumber */,
  string | undefined /* runStepIsCompleted */
];

export const cliRunResultCommand = createCommand("result")
  .description("Toggle the completion status of a run step")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .argument(PARAM_RUN_STEP_NUMBER.name, PARAM_RUN_STEP_NUMBER.description)
  .argument(
    PARAM_RUN_STEP_IS_COMPLETED.name,
    PARAM_RUN_STEP_IS_COMPLETED.description
  )
  .action(cliRunResult);

// todo - think about better way to represent this
export function cliRunResult(
  ...[
    testNameOrTitle,
    lookupRunDateTimeOrStepNumber,
    lookupRunStepNumberOrIsCompleted,
    runStepIsCompletedOrNone,
  ]: RunOpenParameter
) {
  const lookupRunDateTime =
    lookupRunDateTimeOrStepNumber &&
    isDateTimeString(lookupRunDateTimeOrStepNumber)
      ? lookupRunDateTimeOrStepNumber
      : undefined;

  const lookupRunStepNumber = lookupRunDateTime
    ? lookupRunStepNumberOrIsCompleted
    : lookupRunDateTimeOrStepNumber;

  const runStepIsCompletedString = runStepIsCompletedOrNone
    ? runStepIsCompletedOrNone
    : lookupRunStepNumber;

  const runStepIsCompleted = runStepIsCompletedString
    ? Boolean(runStepIsCompletedString)
    : undefined;

  if (!lookupRunStepNumber) {
    logError(`Argument ${PARAM_RUN_STEP_NUMBER.name} is required.`);
    return;
  }

  throwIfError(
    updateRunStepCompleted({
      lookupTestNameOrTitle: testNameOrTitle,
      lookupRunDateTime,
      lookupRunStepIndex: parseInt(lookupRunStepNumber) - 1,
      runStepIsCompleted,
    })
  );
}
