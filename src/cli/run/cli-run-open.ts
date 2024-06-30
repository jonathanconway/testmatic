import { createCommand } from "commander";

import { isError, runOpen } from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";
import { logError } from "../utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";

type RunOpenParameter = [
  string /* testNameOrTitle */,
  string /* runDateTime */
];

export const cliRunOpenCommand = createCommand("open")
  .description("Open a run folder")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunOpen);

export function cliRunOpen(
  ...[testNameOrTitle, runDateTime]: RunOpenParameter
) {
  const runOpenResult = runOpen({ testNameOrTitle, runDateTime });
  if (isError(runOpenResult)) {
    logError(runOpenResult.message);
  }
}
