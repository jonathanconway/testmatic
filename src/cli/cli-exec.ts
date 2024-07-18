#! /usr/bin/env node
import chalk from "chalk";

import { isTestmaticError } from "../framework";
import { packageInfo } from "../package-info";

import { program } from "./cli";
import { logError } from "./utils";

console.log(`
🧪 ${chalk.greenBright(packageInfo.name)} ${packageInfo.version} 
`);

try {
  program.parse();
} catch (error) {
  if (isTestmaticError(error)) {
    logError(error.message);
  }
}
