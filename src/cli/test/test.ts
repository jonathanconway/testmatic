import { createCommand } from "commander";

import { cliTestAddCommand } from "./test-add";
import { cliTestDeleteCommand } from "./test-delete";
import { cliTestListCommand } from "./test-list";
import { cliTestShowCommand } from "./test-show";

export const cliTestCommand = createCommand("test")
  .description("Manage project tests")
  .addCommand(cliTestListCommand)
  .addCommand(cliTestShowCommand)
  .addCommand(cliTestAddCommand)
  .addCommand(cliTestDeleteCommand);