import { generateTestDoc } from "../../doc-generators";
import { cliGenDocTest } from "./gen-doc-test";

export function cliGenDoc([command, ...restArgs]: readonly string[]) {
  const docsPath = `${__dirname}/../../../docs`;

  switch (command) {
    case "test":
      cliGenDocTest(restArgs);
      break;
    // case "step":
    //   cliGenStep(args.slice(1));
    //   break;
    // case "docs":
    //   cliGenDocs(args.slice(1));
    //   break;
    // case "token":
    //   cliGenToken(args.slice(1));
    //   break;
    // default:
    //   cliGenHelp();
  }
}
