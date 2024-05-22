import { Command } from "commander";

import { cliGenCommand } from "./gen";
import { cliRunCommand } from "./run";
import { cliTagCommand } from "./tag";
import { cliTestCommand } from "./test";

const program = new Command();

program
  .name("testmatic")
  .description("CLI to testmatic – a local rapid-entry manual test database.")
  .version("0.0.1")
  .addCommand(cliTestCommand)
  .addCommand(cliTagCommand)
  .addCommand(cliGenCommand)
  .addCommand(cliRunCommand);

export { program };
