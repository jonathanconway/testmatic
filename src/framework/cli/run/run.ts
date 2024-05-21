import { createCommand } from "commander";

import { cliRunAddCommand } from "./run-add";
import { cliRunDeleteCommand } from "./run-delete";
import { cliRunListCommand } from "./run-list";
import { cliRunOpenCommand } from "./run-open";
import { cliRunResultCommand } from "./run-result";
import { cliRunShowCommand } from "./run-show";

export const cliRunCommand = createCommand("run")
  .description("Manage project test runs")
  .addCommand(cliRunListCommand)
  .addCommand(cliRunOpenCommand)
  .addCommand(cliRunShowCommand)
  .addCommand(cliRunAddCommand)
  .addCommand(cliRunResultCommand)
  .addCommand(cliRunDeleteCommand);
