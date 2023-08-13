import { getArgsAfter } from "./cli.utils";
import { cliGen } from "./gen";
import { cliImport } from "./import";
import { cliTest } from "./test";

const [cmd, ...args] = getArgsAfter("cli");

switch (cmd) {
  case "test":
    cliTest(args);
    break;
  case "gen":
    cliGen(args);
    break;
  case "import":
    cliImport(args);
    break;
}
