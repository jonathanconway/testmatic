import { cliImportTest } from "./import-test";

import * as fs from "fs";

jest.mock("fs");

function createMockTestFileContents(
  testName: string,
  testTitle: string,
  steps: readonly string[]
) {
  return `
import { createTest } from "../framework";
import {
${steps.map((step) => `  ${step},`).join("\n")}
} from "../steps";

export const ${testName} = createTest({
  name: "${testName}",
  steps: [
${steps.map((step) => `    ${step},`).join("\n")}
  ],
});

test("${testTitle}", ${testName}.run);
  `.trim();
}

function createMockStepFileContents(name: string) {
  return `
import { createStep } from "../framework";

export const step__${name}_button__${name} = createStep(
  "step__${name}_button__${name}",
  async () => {
    console.log("step__${name}_button__${name}");
  }
);

test("step (${name} button) ${name}", step__${name}_button__${name}.run);
`.trim();
}

function createMockTokenFileContents(name: string) {
  return `
import { createToken } from "../framework";

export const ${name}_button = createToken(
  "${name}",
  "button",
);  
  `.trim();
}

describe("import-test", () => {
  it("imports test from hand-writen md file", () => {
    const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(
      new Buffer(`
## This is a test title (home screen) blah

1. Step (one button) one
2. Step (two button) two
3. Step (three button) three
    `)
    );

    const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);

    const writeFileSyncSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation();

    cliImportTest(["file.md"]);

    expect(readFileSyncSpy).toHaveBeenCalledWith("file.md");

    expect(existsSyncSpy).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("steps/step__one_button__one.step.ts")
    );

    expect(writeFileSyncSpy.mock.calls[0]).toEqual([
      expect.stringContaining(
        "tests/this_is_a_test_title__home_screen__blah.test.ts"
      ),
      createMockTestFileContents(
        "this_is_a_test_title__home_screen__blah",
        "this is a test title (home screen) blah",
        [
          "step__one_button__one",
          "step__two_button__two",
          "step__three_button__three",
        ]
      ),
    ]);

    expect(writeFileSyncSpy.mock.calls[1]).toEqual([
      expect.stringContaining(`../../steps/step__one_button__one.step.ts`),
      createMockStepFileContents("one"),
    ]);

    expect(writeFileSyncSpy.mock.calls[2]).toEqual([
      expect.stringContaining(`../../tokens/one.button.token.ts`),
      createMockTokenFileContents("one"),
    ]);

    expect(writeFileSyncSpy.mock.calls[3]).toEqual([
      expect.stringContaining(`../../steps/step__two_button__two.step.ts`),
      createMockStepFileContents("two"),
    ]);

    expect(writeFileSyncSpy.mock.calls[4]).toEqual([
      expect.stringContaining(`../../tokens/two.button.token.ts`),
      createMockTokenFileContents("two"),
    ]);

    expect(writeFileSyncSpy.mock.calls[5]).toEqual([
      expect.stringContaining(`../../steps/step__three_button__three.step.ts`),
      createMockStepFileContents("three"),
    ]);

    expect(writeFileSyncSpy.mock.calls[6]).toEqual([
      expect.stringContaining(`../../tokens/three.button.token.ts`),
      createMockTokenFileContents("three"),
    ]);
  });
});
