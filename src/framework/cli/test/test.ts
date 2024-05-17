import { ADD_COMMANDS } from "../add";
import { LIST_COMMANDS } from "../list";
import { SHOW_COMMANDS } from "../show";

import { cliTestAdd } from "./test-add";
import { cliTestHelp } from "./test-help";
import { cliTestList } from "./test-list";
import { cliTestShow } from "./test-show";

export function cliTest([command, ...restArgs]: readonly string[]) {
  switch (true) {
    case ADD_COMMANDS.includes(command):
      cliTestAdd(restArgs);
      break;

    case SHOW_COMMANDS.includes(command):
      cliTestShow(restArgs);
      break;

    case LIST_COMMANDS.includes(command):
      cliTestList(restArgs);
      break;

    default:
      cliTestHelp();
  }
}
