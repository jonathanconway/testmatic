import { cliGenDocs } from "./gen-docs";
import { cliGenHelp } from "./gen-help";
import { cliGenStep } from "./gen-step";
import { cliGenTest } from "./gen-test";
import { cliGenToken } from "./gen-token";

const argsAfterGen = process.argv.slice(
  process.argv.findIndex((arg) => arg.endsWith("cli/gen")) + 1
);

switch (true) {
  case argsAfterGen.includes("--help"):
  case argsAfterGen.includes("-h"):
  case argsAfterGen.includes("help"):
    cliGenHelp();
    break;
  case argsAfterGen[0] === "test":
    cliGenTest(argsAfterGen.slice(1));
    break;
  case argsAfterGen[0] === "step":
    cliGenStep(argsAfterGen.slice(1));
    break;
  case argsAfterGen[0] === "docs":
    cliGenDocs(argsAfterGen.slice(1));
    break;
  case argsAfterGen[0] === "token":
    cliGenToken(argsAfterGen.slice(1));
    break;
}
