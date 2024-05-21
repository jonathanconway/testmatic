import * as projectJsonFile from "../../../exporters/json/project-json-file";
import { MOCK_PROJECT_JSON_FILE_EMPTY } from "../../../exporters/json/project-json-file.mocks";
import { program } from "../../cli";

jest.mock("../../../exporters/json/project-json-file", () => ({
  readProjectFile: jest.fn(),
  writeProjectFile: jest.fn(),
}));

const readProjectFileSpy = jest
  .spyOn(projectJsonFile, "readProjectFile")
  .mockReturnValue(MOCK_PROJECT_JSON_FILE_EMPTY);

const writeProjectFileSpy = jest.spyOn(projectJsonFile, "writeProjectFile");

describe("cli test add", () => {
  it("adds a test", () => {
    program.parse([
      "test",
      "add",
      '--title="one"',
      '--step0="first step"',
      '--step1="second step"',
    ]);

    expect(readProjectFileSpy).toBeCalled();

    expect(writeProjectFileSpy).toBeCalledWith({
      steps: {
        first_step: {
          title: '"first step"',
          name: "first_step",
          links: {},
          tagNames: [],
        },
        second_step: {
          title: '"second step"',
          name: "second_step",
          links: {},
          tagNames: [],
        },
      },
      tests: {
        one: {
          title: '"one"',
          name: "one",
          links: {},
          stepNames: ["first_step", "second_step"],
          tagNames: [],
          runs: {},
        },
      },
      tags: {},
    });
  });

  it("parses step texts for tags and links them where they do already exist", () => {});

  it("parses step texts for tags and adds them where they do not yet exist", () => {
    program.parse([
      "test",
      "add",
      '--title="user can log in"',
      '--step0="go to (login screen)"',
      '--step1="enter username into (username field)"',
      '--step2="enter password into (password field)"',
      '--step3="click (submit button)"',
    ]);

    expect(readProjectFileSpy).toBeCalled();

    expect(writeProjectFileSpy).toBeCalledWith({
      steps: {
        go_to_login_screen: {
          title: '"go to (login screen)"',
          name: "go_to_login_screen",
          links: {},
          tagNames: ["login_screen"],
        },
        enter_username_into_username_field: {
          title: '"enter username into (username field)"',
          name: "enter_username_into_username_field",
          links: {},
          tagNames: ["username_field"],
        },
        enter_password_into_password_field: {
          title: '"enter password into (password field)"',
          name: "enter_password_into_password_field",
          links: {},
          tagNames: ["password_field"],
        },
      },
      tests: {
        one: {
          title: '"one"',
          name: "one",
          links: {},
          stepNames: [
            "go_to_login_screen",
            "enter_username_into_username_field",
            "enter_password_into_password_field",
          ],
          tagNames: [],
          runs: {},
        },
      },
      tags: {
        login_screen: {
          name: "login_screen",
          type: "screen",
          description: "",
          links: [],
        },
      },
    });
  });
});
