import { createCommand } from "commander";

import { cliTestTagAddCommand } from "./test-tag-add";
import { cliTestTagDeleteCommand } from "./test-tag-delete";

export const cliTestTagCommand = createCommand("tag")
  .description("Manage test tags")
  .addCommand(cliTestTagAddCommand)
  .addCommand(cliTestTagDeleteCommand);
