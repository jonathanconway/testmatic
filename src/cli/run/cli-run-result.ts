import { createCommand } from "commander";

import { RunResult, runResult, throwIfError } from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_RUN_RESULT } from "./param-run-result";

type RunOpenParameter = [
  string /* testNameOrTitle */,
  string /* runResultValue */,
  string | undefined /* runDateTime */
];

export const cliRunResultCommand = createCommand("result")
  .description("Record the result of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_RESULT.name, PARAM_RUN_RESULT.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunResult);

export function cliRunResult(
  ...[testNameOrTitle, runResultValue, runDateTime]: RunOpenParameter
) {
  throwIfError(
    runResult({
      lookupTestNameOrTitle: testNameOrTitle,
      runResultValue: runResultValue as RunResult,
      lookupRunDateTime: runDateTime,
    })
  );
}
