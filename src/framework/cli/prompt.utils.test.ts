// import * as promptSync from "prompt-sync";
import { promptFields } from "./prompt.utils";

const mockPromptSync = jest.fn();
jest.mock("prompt-sync", () => mockPromptSync);

// jest.mocked(promptSync);

describe("prompt.utils", () => {
  it("x", () => {
    console.log(promptFields(["firstName", "lastName"]));
  });
  // it.each`
  //   fields                              | args                                                | expectedOutput
  //   ${["firstName", "lastName"]}        | ${["--firstName", "Mary", "--lastName", "Chang"]}   | ${{ firstName: "Mary", lastName: "Chang" }}
  //   ${["firstName", "lastName", "age"]} | ${["--firstName", "Mary", "--lastName", "Chang"]}   | ${{ firstName: "Mary", lastName: "Chang" }}
  //   ${["firstName", "lastName", "age"]} | ${["--firstName", '"Mary"', "--lastName", "Chang"]} | ${{ firstName: "Mary", lastName: "Chang" }}
  //   ${["firstName", "lastName"]}        | ${["--firstName", "Mary", "--lastName"]}            | ${{ firstName: "Mary" }}
  //   ${["firstName", "lastName"]}        | ${["--firstName", "Mary"]}                          | ${{ firstName: "Mary" }}
  // `(
  //   "extracts named fields from args where a match is found",
  //   ({ fields, args, expectedOutput }) => {
  //     expect(pickArgs(fields, args)).toEqual(expectedOutput);
  //   }
  // );
});
