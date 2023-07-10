import { cliTestList } from "./test-list";

export function cliTest(args: readonly string[]) {
  switch (true) {
    // case argsAfterGen.includes("--help"):
    // case argsAfterGen.includes("-h"):
    // case argsAfterGen.includes("help"):
    //   cliGenHelp();
    //   break;
    case args[0] === "list":
    case args[0] === "ls":
      cliTestList(args.slice(1));
      break;
  }
}
