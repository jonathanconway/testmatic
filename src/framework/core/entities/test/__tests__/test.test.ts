import { omit } from "lodash";

import { ValidationError, isValidationError } from "../../../../utils";
import { CreateTestParams, createTest } from "../test-create";
import { MOCK_CREATE_TEST_PARAMS } from "../test.mocks";

describe("test", () => {
  describe("createTest", () => {
    it("creates a new test from provided parameters", () => {
      const test = createTest(MOCK_CREATE_TEST_PARAMS);

      expect(test).toEqual({
        type: "test",
        name: "mock_test",
        title: "Mock test",
        description: "Mock test description",
        steps: [
          { text: "step one", tags: [] },
          { text: "step two", tags: [] },
          {
            text: "step three (with tag)",
            tags: [
              { type: "tag", name: "with_tag", title: "With tag", links: [] },
            ],
          },
        ],
        links: [],
        tags: [],
        runs: [],
      });
    });

    it.each(["title"])(
      "returns an error if required fields are not provided",
      (notProvidedField) => {
        const result = createTest(
          omit(MOCK_CREATE_TEST_PARAMS, notProvidedField) as CreateTestParams
        );

        expect(isValidationError(result)).toBeTruthy();
        expect((result as ValidationError).message).toEqual(
          `Validation error: Required at "${notProvidedField}"`
        );
      }
    );
  });
});
