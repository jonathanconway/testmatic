import { cliImportTest } from "./import-test";
import { cliImportTests } from "./import-tests";

export function cliImport(args: readonly string[]) {
  switch (true) {
    // case args.includes("--help"):
    // case args.includes("-h"):
    // case args.includes("help"):
    //   cliGenHelp();
    //   break;
    case args[0] === "test":
      cliImportTest(args.slice(1));
      break;
    case args[0] === "tests":
      cliImportTests(args.slice(1));
      break;
  }
}
