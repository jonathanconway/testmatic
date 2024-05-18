import { createCommand } from "commander";

import { cliRunListCommand } from "./run-list";
import { cliRunOpenCommand } from "./run-open";

export const cliRunCommand = createCommand("run")
  .description("Manage project test runs")
  .addCommand(cliRunListCommand)
  .addCommand(cliRunOpenCommand);

// .addCommand(cliTestShowCommand)
// .addCommand(cliTestAddCommand)
// .addCommand(cliTestDeleteCommand);
