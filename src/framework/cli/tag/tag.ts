import { LINK_COMMANDS } from "../link";
import { LIST_COMMANDS } from "../list";
import { SHOW_COMMANDS } from "../show";

import { cliTagHelp } from "./tag-help";
import { cliTagLink } from "./tag-link";
import { cliTagList } from "./tag-list";
import { cliTagShow } from "./tag-show";

export function cliTag([cmd, ...args]: readonly string[]) {
  switch (true) {
    case LINK_COMMANDS.includes(cmd):
      cliTagLink(args);
      break;
    case LIST_COMMANDS.includes(cmd):
      cliTagList();
      break;
    case SHOW_COMMANDS.includes(cmd):
      cliTagShow(args);
      break;

    default:
      cliTagHelp();
  }
}
