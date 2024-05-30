import { createCommand } from "commander";

import { cliTestLinkAddCommand } from "./cli-test-link-add";
import { cliTestLinkDeleteCommand } from "./cli-test-link-delete";
import { cliTestLinkOpenCommand } from "./cli-test-link-open";

export const cliTestLinkCommand = createCommand("link")
  .description("Manage test links")
  .addCommand(cliTestLinkAddCommand)
  .addCommand(cliTestLinkOpenCommand)
  .addCommand(cliTestLinkDeleteCommand);
