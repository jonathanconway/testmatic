export function cliGenHelp() {
  console.log(`

Usage: testmatic gen ARTIFACT

Generates useful output from the test project, such as docs and test runners.

Entities:
  runners    Generates test runners for all tests
  runner     Generates test runner for a specific test
  docs       Generates documentation in Markdown format for all tests, steps, tags and runs
  doc        Generates documentation in Markdown format for a particular test, step, tag or run
`);
}
