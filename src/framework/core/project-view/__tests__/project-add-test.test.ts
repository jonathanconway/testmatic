import { isError } from "../../../utils";
import {
  MOCK_NEW_TAGS,
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_THREE,
  MOCK_NEW_TAG_TWO,
  MOCK_TAG,
  MOCK_TAG_TWO,
} from "../../tag";
import { MOCK_NEW_TEST, Test, createTest } from "../../test";
import { projectAddTest } from "../project-add-test";
import { MOCK_PROJECT_VIEW } from "../project-view.mocks";

describe("project-add-test", () => {
  describe("addProjectTest", () => {
    it("adds the provided test to the provided project", () => {
      const MOCK_NEW_TEST = createTest({
        title: "mock new test",
        stepTexts: ["mock new test step one", "mock new test step two"],
      }) as Test;

      const updatedProjectView = projectAddTest({
        project: MOCK_PROJECT_VIEW,
        newTest: MOCK_NEW_TEST,
      });

      if (isError(updatedProjectView)) {
        throw updatedProjectView;
      }

      expect(updatedProjectView.tests).toEqual([
        ...MOCK_PROJECT_VIEW.tests,
        MOCK_NEW_TEST,
      ]);

      expect(updatedProjectView.testsByName).toEqual({
        ...MOCK_PROJECT_VIEW.testsByName,
        [MOCK_NEW_TEST.name]: MOCK_NEW_TEST,
      });
    });

    it("adds the provided test's new tags to the provided project", () => {
      const updatedProjectView = projectAddTest({
        project: MOCK_PROJECT_VIEW,
        newTest: MOCK_NEW_TEST,
      });

      if (isError(updatedProjectView)) {
        throw updatedProjectView;
      }

      expect(updatedProjectView.tags).toEqual(
        expect.arrayContaining([...MOCK_PROJECT_VIEW.tags, ...MOCK_NEW_TAGS])
      );

      expect(updatedProjectView.tagsByName).toEqual(
        expect.objectContaining({
          ...MOCK_PROJECT_VIEW.tagsByName,
          [MOCK_NEW_TAG_ONE.name]: MOCK_NEW_TAG_ONE,
          [MOCK_NEW_TAG_TWO.name]: MOCK_NEW_TAG_TWO,
          [MOCK_NEW_TAG_THREE.name]: MOCK_NEW_TAG_THREE,
        })
      );
    });

    it("matches the provided test's tags to existing tags in the provided project if possible", () => {
      const updatedProjectView = projectAddTest({
        project: MOCK_PROJECT_VIEW,
        newTest: MOCK_NEW_TEST,
      });

      if (isError(updatedProjectView)) {
        throw updatedProjectView;
      }

      const updatedProjectTestsNewTest = updatedProjectView.tests.find(
        (test) => test.name === MOCK_NEW_TEST.name
      );

      const updatedProjectTestsNewTestStepThreeTags =
        updatedProjectTestsNewTest?.steps[2].tags ?? [];

      expect(updatedProjectTestsNewTestStepThreeTags).toEqual(
        expect.arrayContaining([updatedProjectView.tagsByName[MOCK_TAG.name]])
      );

      const updatedProjectTestsNewTestTags =
        updatedProjectTestsNewTest?.tags ?? [];

      expect(updatedProjectTestsNewTestTags).toEqual(
        expect.arrayContaining([
          updatedProjectView.tagsByName[MOCK_TAG_TWO.name],
        ])
      );

      const updatedProjectTestsByName =
        updatedProjectView.testsByName[MOCK_NEW_TEST.name];

      const updatedProjectTestsByNameNewTestStepThreeTags =
        updatedProjectTestsByName?.steps[2].tags ?? [];

      expect(updatedProjectTestsByNameNewTestStepThreeTags).toEqual(
        expect.arrayContaining([updatedProjectView.tagsByName[MOCK_TAG.name]])
      );

      const updatedProjectTestsByNameNewTestTags =
        updatedProjectTestsByName?.tags ?? [];

      expect(updatedProjectTestsByNameNewTestTags).toEqual(
        expect.arrayContaining([
          updatedProjectView.tagsByName[MOCK_TAG_TWO.name],
        ])
      );
    });
  });
});
