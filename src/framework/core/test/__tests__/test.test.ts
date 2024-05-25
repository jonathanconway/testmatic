import { omit } from "lodash";

import { ValidationError, isValidationError } from "../../../utils";
import { createTest } from "../test-create";
import { MOCK_CREATE_TEST_PARAMS } from "../test.mocks";

describe("test", () => {
  describe("createTest", () => {
    it("creates a new test from provided parameters", () => {
      const test = createTest(MOCK_CREATE_TEST_PARAMS);

      expect(test).toEqual({
        name: "mock_test",
        title: "Mock test",
        description: "Mock test description",
        steps: [
          { text: "step one", tags: [] },
          { text: "step two", tags: [] },
          {
            text: "step three (with tag)",
            tags: [{ name: "with_tag", title: "With tag", links: [] }],
          },
        ],
        links: [],
        tags: [],
        runs: [],
      });
    });

    it.each(["title", "steps"])(
      "returns an error if required fields are not provided",
      (notProvidedField) => {
        const result = createTest(
          omit(MOCK_CREATE_TEST_PARAMS, notProvidedField)
        );

        expect(isValidationError(result)).toBeTruthy();
        expect((result as ValidationError).message).toEqual(
          `Validation error: Required at "${notProvidedField}"`
        );
      }
    );

    it("returns an error if steps are not provided", () => {
      const result = createTest({
        ...MOCK_CREATE_TEST_PARAMS,
        stepTexts: [],
      });

      expect(isValidationError(result)).toBeTruthy();
      expect((result as ValidationError).message).toEqual(
        `Validation error: Array must contain at least 1 element(s) at \"steps\"`
      );
    });
  });
});
