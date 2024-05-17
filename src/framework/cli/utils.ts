export function getArgsAfter(suffix: string) {
  return process.argv.slice(
    process.argv.findIndex((arg) => arg.includes(suffix)) + 1
  );
}
