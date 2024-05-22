// import * as promptSync from "prompt-sync";
import { pickArgs } from "./args.utils";

const mockPrompt = jest.fn();
const mockPromptSync = jest.fn().mockReturnValue(mockPrompt);

jest.mock("prompt-sync", () => mockPromptSync);

describe("prompt.utils", () => {
  describe("promptFIelds", () => {
    it("promopts the user for each field provided and returns the inputs in an object", async () => {
      const { promptFields } = await import("./prompt.utils");

      mockPrompt.mockReturnValueOnce("mary");
      mockPrompt.mockReturnValueOnce("doe");

      const result = promptFields(["firstName", "lastName"]);

      expect(result).toEqual({ firstName: "mary", lastName: "doe" });
    });
  });

  it.each`
    fields                              | args                                                | expectedOutput
    ${["firstName", "lastName"]}        | ${["--firstName", "Mary", "--lastName", "Chang"]}   | ${{ firstName: "Mary", lastName: "Chang" }}
    ${["firstName", "lastName", "age"]} | ${["--firstName", "Mary", "--lastName", "Chang"]}   | ${{ firstName: "Mary", lastName: "Chang" }}
    ${["firstName", "lastName", "age"]} | ${["--firstName", '"Mary"', "--lastName", "Chang"]} | ${{ firstName: "Mary", lastName: "Chang" }}
    ${["firstName", "lastName"]}        | ${["--firstName", "Mary", "--lastName"]}            | ${{ firstName: "Mary" }}
    ${["firstName", "lastName"]}        | ${["--firstName", "Mary"]}                          | ${{ firstName: "Mary" }}
  `(
    "extracts named fields from args where a match is found",
    ({ fields, args, expectedOutput }) => {
      expect(pickArgs(fields, args)).toEqual(expectedOutput);
    }
  );
});
