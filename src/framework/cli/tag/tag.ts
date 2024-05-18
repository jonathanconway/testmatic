import { createCommand } from "commander";

import { cliTagAddCommand } from "./tag-add";
import { cliTagDeleteCommand } from "./tag-delete";
import { cliTagImpactsCommand } from "./tag-impacts";
import { cliTagLinkCommand } from "./tag-link";
import { cliTagListCommand } from "./tag-list";
import { cliTagShowCommand } from "./tag-show";

export const cliTagCommand = createCommand("tag")
  .description("Manage project tags")
  .addCommand(cliTagListCommand)
  .addCommand(cliTagShowCommand)
  .addCommand(cliTagAddCommand)
  .addCommand(cliTagDeleteCommand)
  .addCommand(cliTagLinkCommand)
  .addCommand(cliTagImpactsCommand);
