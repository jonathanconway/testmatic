import { createCommand } from "commander";

import { projectGetTestByNameOrTitle } from "../../core";
import { projectGetTestRunByDateTimeOrLatest } from "../../core";
import { getRunFiles } from "../../markdown";
import { formatDateTimeString } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { PARAM_RUN_DATETIME } from "./param-run-datetime";
import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type RunShowParameter = [string, string];

export const cliRunShowCommand = createCommand("show")
  .description("Show the full details of a run")
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .argument(PARAM_RUN_DATETIME.name, PARAM_RUN_DATETIME.description)
  .action(cliRunShow);

export function cliRunShow(
  ...[testNameOrTitle, runDateTime]: RunShowParameter
) {
  const project = readProject();

  const test = projectGetTestByNameOrTitle({ project, testNameOrTitle });

  const run = projectGetTestRunByDateTimeOrLatest({ test, runDateTime });

  const files = getRunFiles({ test, run });

  const dateTimeFormatted = formatDateTimeString(run.dateTime);

  const title = `${test.title} – ${dateTimeFormatted}`;

  console.log(
    `
${title}
${"=".repeat(title.length)}

Files
-----

${toAsciiTable(
  files.map((file) => ({
    Filename: `${file}`,
  }))
)}
`.trimLines()
  );
}
