import { cliTestList } from "./test-list";
import { cliTestShow } from "./test-show";

export function cliTest(args: readonly string[]) {
  switch (true) {
    // case argsAfterGen.includes("--help"):
    // case argsAfterGen.includes("-h"):
    // case argsAfterGen.includes("help"):
    //   cliGenHelp();
    //   break;
    case args[0] === "show":
    case args[0] === "sh":
    case args[0] === "s":
      cliTestShow(args.slice(1));
      break;
    case args[0] === "list":
    case args[0] === "ls":
      cliTestList(args.slice(1));
      break;
  }
}
