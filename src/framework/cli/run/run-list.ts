import { createCommand } from "commander";

import { getRunFilepath } from "../../markdown";
import { sentenceCase } from "../../utils";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

type RunListParameters = string;

export const cliRunListCommand = createCommand("list")
  .description("List runs for the specified test")
  .argument("<name>", "Name or title of test for which to show runs")
  .action(cliRunList);

export function cliRunList(testName: RunListParameters) {
  const project = readProject();

  const test = project.testsByName[testName];
  const runs = test.runs;

  console.log(
    `
${test.title}
${"=".repeat(test.title.length)}
    
Runs
----`
  );

  console.log(
    toAsciiTable(
      runs.map((run) => ({
        dateTime: run.dateTime,
        result: run.result ? sentenceCase(run.result) : "-",
        folder: getRunFilepath(test, run),
      })),
      ["Date/time", "Result", "Folder"]
    )
  );
}
