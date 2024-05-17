import { cliHelp } from "./cli-help";
import { cliGen } from "./gen/gen";
import { cliTag } from "./tag/tag";
import { cliTest } from "./test/test";

export function cli([cmd, ...args]: string[]) {
  switch (cmd) {
    case "test":
      cliTest(args);
      break;

    case "tag":
      cliTag(args);
      break;

    case "gen":
      cliGen(args);
      break;

    default:
      cliHelp();
  }
}
