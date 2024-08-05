import chalk from "chalk";

export function logError(message: string) {
  console.log(`
${chalk.redBright("⚠️ Whoops!")} Something went wrong...

${message}
`);
}
