import { exec } from "child_process";
import { createCommand } from "commander";

import { getRunFilepath, getRunsFilepath } from "../../markdown";
import { readProject } from "../project.utils";

type RunOpenParameter = [string, string];

export const cliRunOpenCommand = createCommand("open")
  .description("Open a run folder")
  .argument("<testName>", "Name of the test")
  .argument("[dateTime]", "Date/time stamp of the run")
  .action(cliRunOpen);

export function cliRunOpen(...[testName, runDateTime]: RunOpenParameter) {
  const project = readProject();

  const test = project.testsByName[testName];

  const run = test.runs.find((run) => run.dateTime === runDateTime);

  if (!run) {
    exec(`open "${getRunsFilepath(test)}"`);
    return;
  }

  exec(`open "${getRunFilepath(test, run)}"`);
}
