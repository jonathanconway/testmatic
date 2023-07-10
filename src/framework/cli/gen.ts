import { cliGenDocs } from "./gen-docs";
import { cliGenHelp } from "./gen-help";
import { cliGenStep } from "./gen-step";
import { cliGenTest } from "./gen-test";
import { cliGenToken } from "./gen-token";

export function cliGen(args: readonly string[]) {
  switch (true) {
    case args.includes("--help"):
    case args.includes("-h"):
    case args.includes("help"):
      cliGenHelp();
      break;
    case args[0] === "test":
      cliGenTest(args.slice(1));
      break;
    case args[0] === "step":
      cliGenStep(args.slice(1));
      break;
    case args[0] === "docs":
      cliGenDocs(args.slice(1));
      break;
    case args[0] === "token":
      cliGenToken(args.slice(1));
      break;
  }
}
