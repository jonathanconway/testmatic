export function cliGenHelp() {
  console.log(
    `
testmatic generator

Usage: testmatic-gen command

Commands:
  test       Generates a test code file and its step code files from command-line args or prompt responses
  step       Generates a step code file from command-line args or prompt responses
  docs       Generates documentation in Markdown format for all tests, steps and tokens
  help       Shows this help, or help about a command

Example:
  gen help

`.trim()
  );
}
