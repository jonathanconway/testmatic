import { createCommand } from "commander";

import { cliTestAddCommand } from "./cli-test-add";
import { cliTestDeleteCommand } from "./cli-test-delete";
import { cliTestImpactsCommand } from "./cli-test-impacts";
import { cliTestLinkCommand } from "./cli-test-link";
import { cliTestListCommand } from "./cli-test-list";
import { cliTestShowCommand } from "./cli-test-show";
import { cliTestTagCommand } from "./cli-test-tag";

export const cliTestCommand = createCommand("test")
  .description("Manage project tests")
  .addCommand(cliTestListCommand)
  .addCommand(cliTestShowCommand)
  .addCommand(cliTestAddCommand)
  .addCommand(cliTestDeleteCommand)
  .addCommand(cliTestTagCommand)
  .addCommand(cliTestLinkCommand)
  .addCommand(cliTestImpactsCommand);
