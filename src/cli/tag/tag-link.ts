import { createCommand } from "commander";

import { cliTagLinkAddCommand } from "./tag-link-add";
import { cliTagLinkDeleteCommand } from "./tag-link-delete";
import { cliTagLinkOpenCommand } from "./tag-link-open";

export const cliTagLinkCommand = createCommand("link")
  .description("Manage tag links")
  .addCommand(cliTagLinkAddCommand)
  .addCommand(cliTagLinkOpenCommand)
  .addCommand(cliTagLinkDeleteCommand);
