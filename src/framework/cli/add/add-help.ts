export function cliAddHelp() {
  console.log(
    `
Usage: testmatic add ENTITY

Add a new entity to your test system - e.g. test, step, token.

Entities:
  test       Adds a new test and its associated steps
  step       Adds a new step
  token      Adds a new token
  link       Adds a new link
  run        Adds a new test run
  help       Shows this help, or help about a command
`
  );
}
