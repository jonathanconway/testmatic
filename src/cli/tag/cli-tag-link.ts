import { createCommand } from "commander";

import { cliTagLinkAddCommand } from "./cli-tag-link-add";
import { cliTagLinkDeleteCommand } from "./cli-tag-link-delete";
import { cliTagLinkOpenCommand } from "./cli-tag-link-open";

export const cliTagLinkCommand = createCommand("link")
  .description("Manage tag links")
  .addCommand(cliTagLinkAddCommand)
  .addCommand(cliTagLinkOpenCommand)
  .addCommand(cliTagLinkDeleteCommand);
