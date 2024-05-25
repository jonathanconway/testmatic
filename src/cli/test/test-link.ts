import { createCommand } from "commander";

import { cliTestLinkAddCommand } from "./test-link-add";
import { cliTestLinkDeleteCommand } from "./test-link-delete";
import { cliTestLinkOpenCommand } from "./test-link-open";

export const cliTestLinkCommand = createCommand("link")
  .description("Manage test links")
  .addCommand(cliTestLinkAddCommand)
  .addCommand(cliTestLinkOpenCommand)
  .addCommand(cliTestLinkDeleteCommand);
