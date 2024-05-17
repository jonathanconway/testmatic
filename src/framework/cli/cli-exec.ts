import { cli } from "./cli";
import { getArgsAfter } from "./utils";

const args = getArgsAfter("cli/cli-exec");

cli(args);
