export function cliHelp() {
  console.log(`

Usage: testmatic COMMAND

Manages the tests, steps, links and tags in the current project and generates useful artifacts such as docs.

Entities:
  gen        Generates useful outputs, such as docs and test runners.
  test       Manages tests
  tag        Manages tags
  link       Manages links
  run        Manages runs
`);
}
