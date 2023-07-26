import { cliImportTest } from "./import-test";

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
  }
}
