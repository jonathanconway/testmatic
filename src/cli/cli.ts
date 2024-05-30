import { Command } from "commander";

import { packageInfo } from "../package-info";

import { cliGenCommand } from "./gen";
import { cliInitCommand } from "./init";
import { cliProjectCommand } from "./project";
import { cliRunCommand } from "./run";
import { cliTagCommand } from "./tag";
import { cliTestCommand } from "./test";

const program = new Command();

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .addCommand(cliInitCommand)
  .addCommand(cliProjectCommand)
  .addCommand(cliTestCommand)
  .addCommand(cliTagCommand)
  .addCommand(cliGenCommand)
  .addCommand(cliRunCommand);

export { program };
