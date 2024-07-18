import { createCommand } from "commander";

import { runOpen, throwIfError } from "../../framework";
import { PARAM_TEST_NAME_OR_TITLE } from "../test";

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
  throwIfError(
    runOpen({
      lookupTestNameOrTitle: testNameOrTitle,
      lookupRunDateTime: runDateTime,
    })
  );
}
