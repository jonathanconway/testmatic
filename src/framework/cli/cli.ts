import { getArgsAfter } from "./cli.utils";
import { cliGen } from "./gen";
import { cliTest } from "./test";

const [cmd, ...args] = getArgsAfter("cli");

switch (cmd) {
  case "test":
    cliTest(args);
  case "gen":
    cliGen(args);
}
