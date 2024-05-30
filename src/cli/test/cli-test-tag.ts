import { createCommand } from "commander";

import { cliTestTagAddCommand } from "./cli-test-tag-add";
import { cliTestTagDeleteCommand } from "./cli-test-tag-delete";

export const cliTestTagCommand = createCommand("tag")
  .description("Manage test tags")
  .addCommand(cliTestTagAddCommand)
  .addCommand(cliTestTagDeleteCommand);
