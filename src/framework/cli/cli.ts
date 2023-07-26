import { getArgsAfter } from "./cli.utils";
import { cliGen } from "./gen";
import { cliImport } from "./import";
import { cliTest } from "./test";

const [cmd, ...args] = getArgsAfter("cli");

switch (cmd) {
  case "test":
    cliTest(args);
    console.log("cli", { args });
  case "gen":
    cliGen(args);
  case "import":
    cliImport(args);
}
