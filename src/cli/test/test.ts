import { createCommand } from "commander";

import { cliTestAddCommand } from "./test-add";
import { cliTestDeleteCommand } from "./test-delete";
import { cliTestImpactsCommand } from "./test-impacts";
import { cliTestLinkCommand } from "./test-link";
import { cliTestListCommand } from "./test-list";
import { cliTestShowCommand } from "./test-show";
import { cliTestTagCommand } from "./test-tag";

export const cliTestCommand = createCommand("test")
  .description("Manage project tests")
  .addCommand(cliTestListCommand)
  .addCommand(cliTestShowCommand)
  .addCommand(cliTestAddCommand)
  .addCommand(cliTestDeleteCommand)
  .addCommand(cliTestTagCommand)
  .addCommand(cliTestLinkCommand)
  .addCommand(cliTestImpactsCommand);
