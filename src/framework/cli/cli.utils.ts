export function getArgsAfter(suffix: string) {
  return process.argv.slice(
    process.argv.findIndex((arg) => arg.endsWith(`cli/${suffix}`)) + 1
  );
}
