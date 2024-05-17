import * as projectJsonFile from "../../../exporters/json/project-json-file";
import { MOCK_PROJECT_JSON_FILE } from "../../../exporters/json/project-json-file.mocks";
import { cli } from "../../cli";

jest.mock("../../../exporters/json/project-json-file", () => ({
  readProjectFile: jest.fn(),
}));

const readProjectFileSpy = jest
  .spyOn(projectJsonFile, "readProjectFile")
  .mockReturnValue(MOCK_PROJECT_JSON_FILE);

const consoleLogSpy = jest.spyOn(console, "log");

describe("cli test show", () => {
  it("shows test looked up by name", () => {
    cli(["test", "show", "test_one"]);

    expect(readProjectFileSpy).toBeCalled();

    expect(consoleLogSpy).toBeCalledWith(
      `
## Test: test one

1. step one [🔗](../steps/step_one.md)
2. step two [🔗](../steps/step_two.md)
`
    );
  });

  it("shows test looked up by title", () => {
    cli(["test", "show", "test one"]);

    expect(readProjectFileSpy).toBeCalled();

    expect(consoleLogSpy).toBeCalledWith(
      `
## Test: test one

1. step one [🔗](../steps/step_one.md)
2. step two [🔗](../steps/step_two.md)
`
    );
  });

  it("prints error if test name or title not provided", () => {
    cli(["test", "show"]);

    expect(consoleLogSpy).toBeCalledWith(
      "Error: Please provide name parameter."
    );
  });

  it("prints error if test name or title not found", () => {
    cli(["test", "show", "test_eleven"]);

    expect(consoleLogSpy).toBeCalledWith(
      'Error: Cannot find test with name or title matching "test_eleven"'
    );
  });
});
