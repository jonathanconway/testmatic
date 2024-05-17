import { cliAddHelp } from "./add-help";

export const ADD_COMMANDS = ["add", "a"];

export function cliAdd([command, ...restArgs]: readonly string[]) {
  switch (true) {
    default:
      cliAddHelp();
  }
}
