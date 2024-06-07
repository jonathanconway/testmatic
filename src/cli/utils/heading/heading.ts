export function logHeading(input: string, level: 1 | 2) {
  console.log(input);

  const underline =
    level === 1 ? input.asciiUnderlineDouble() : input.asciiUnderline();
  console.log(underline);
  console.log();
}
