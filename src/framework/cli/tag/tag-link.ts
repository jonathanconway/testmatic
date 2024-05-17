import { ADD_COMMANDS } from "../add/add";
import { LIST_COMMANDS } from "../list";

import { cliTagLinkAdd } from "./tag-link-add";
import { cliTagLinkList } from "./tag-link-list";

export function cliTagLink([command, ...restArgs]: readonly string[]) {
  switch (true) {
    case ADD_COMMANDS.includes(command):
      cliTagLinkAdd(restArgs);
      break;
    case LIST_COMMANDS.includes(command):
      cliTagLinkList(restArgs);
      break;
  }
}
