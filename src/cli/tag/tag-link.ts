import { createCommand } from "commander";

import { cliTagLinkAddCommand } from "./tag-link-add";
import { cliTagLinkDeleteCommand } from "./tag-link-delete";
import { cliTagLinkListCommand } from "./tag-link-list";
import { cliTagLinkOpenCommand } from "./tag-link-open";

export const cliTagLinkCommand = createCommand("link")
  .description("Manage tag links")
  .addCommand(cliTagLinkListCommand)
  .addCommand(cliTagLinkAddCommand)
  .addCommand(cliTagLinkOpenCommand)
  .addCommand(cliTagLinkDeleteCommand);
