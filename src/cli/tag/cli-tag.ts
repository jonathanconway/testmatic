import { createCommand } from "commander";

import { cliTagAddCommand } from "./cli-tag-add";
import { cliTagDeleteCommand } from "./cli-tag-delete";
import { cliTagImpactsCommand } from "./cli-tag-impacts";
import { cliTagLinkCommand } from "./cli-tag-link";
import { cliTagListCommand } from "./cli-tag-list";
import { cliTagShowCommand } from "./cli-tag-show";
import { cliTagTypeCommand } from "./cli-tag-type";

export const cliTagCommand = createCommand("tag")
  .description("Manage project tags")
  .addCommand(cliTagListCommand)
  .addCommand(cliTagShowCommand)
  .addCommand(cliTagAddCommand)
  .addCommand(cliTagDeleteCommand)
  .addCommand(cliTagLinkCommand)
  .addCommand(cliTagTypeCommand)
  .addCommand(cliTagImpactsCommand);
