import { program } from "../../cli";

const consoleLogSpy = jest.spyOn(console, "log");

describe("cli test help", () => {
  it("prints help text", () => {
    program.parse(["test", "help"]);

    expect(consoleLogSpy).toBeCalledWith(
      `
Usage: testmatic test COMMAND

Manage tests

Commands:
  add       Add a new test
  link      Manage a test's links
  list      List tests
  remove    Remove a test
  show      Show details of a test
`
    );
  });
});
