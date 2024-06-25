import chalk from "chalk";

export function logHeading(input: string, level: 1 | 2) {
  console.log(chalk.gray(input));

  const underline =
    level === 1 ? input.asciiUnderlineDouble() : input.asciiUnderline();
  console.log(chalk.gray(underline));
  console.log();
}
