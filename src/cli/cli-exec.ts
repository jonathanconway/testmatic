#! /usr/bin/env node
import chalk from "chalk";

import { packageInfo } from "../package-info";

import { program } from "./cli";

console.log(`
🧪 ${chalk.greenBright(packageInfo.name)} ${packageInfo.version} 
`);

program.parse();
