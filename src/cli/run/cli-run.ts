import { createCommand } from "commander";

import { cliRunAddCommand } from "./cli-run-add";
import { cliRunDeleteCommand } from "./cli-run-delete";
import { cliRunListCommand } from "./cli-run-list";
import { cliRunOpenCommand } from "./cli-run-open";
import { cliRunResultCommand } from "./cli-run-result";
import { cliRunShowCommand } from "./cli-run-show";

export const cliRunCommand = createCommand("run")
  .description("Manage project test runs")
  .addCommand(cliRunListCommand)
  .addCommand(cliRunOpenCommand)
  .addCommand(cliRunShowCommand)
  .addCommand(cliRunAddCommand)
  .addCommand(cliRunResultCommand)
  .addCommand(cliRunDeleteCommand);
