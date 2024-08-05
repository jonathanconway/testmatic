import chalk from "chalk";

export function logSuccess(message?: string) {
  console.log(`
${chalk.greenBright("✔")} ${message ?? ""}
`);
}
