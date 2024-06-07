import { MOCK_PROJECT_JSON } from "../../../framework/exporters/json/project-json.mocks";
import * as projectJsonFile from "../../../framework/fs/json/project-json-file";
import { program } from "../../cli";

const readProjectFileSpy = jest
  .spyOn(projectJsonFile, "readProjectFile")
  .mockReturnValue(MOCK_PROJECT_JSON);

const consoleLogSpy = jest.spyOn(console, "log");

describe("cli test list", () => {
  it("lists all tests", () => {
    program.parse(["test", "list"]);

    expect(readProjectFileSpy).toBeCalled();

    expect(consoleLogSpy).toBeCalledWith(
      `
TITLE       DOC                       
test one    ./docs/tests/test_one.md  
test two    ./docs/tests/test_two.md  
test three  ./docs/tests/test_three.md
`
    );
  });

  it("lists tests having filtered tag", () => {
    program.parse(["test", "list", "--filter-tag=tag_one"]);

    expect(readProjectFileSpy).toBeCalled();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `
TITLE     DOC                     
test two  ./docs/tests/test_two.md
`
    );
  });

  it("lists tests having steps having filtered tag", () => {
    program.parse(["test", "list", "--filter-tag=tag_two"]);

    expect(readProjectFileSpy).toBeCalled();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `
TITLE       DOC                       
test three  ./docs/tests/test_three.md
`
    );
  });
});
