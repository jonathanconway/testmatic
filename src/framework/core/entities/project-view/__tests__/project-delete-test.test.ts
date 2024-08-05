import assert from "assert";

import { projectDeleteTest } from "../../../actions";
import { isResultError } from "../../../result";
import { MOCK_TEST } from "../../test";
import { MOCK_PROJECT_VIEW } from "../project-view.mocks";

describe("project-delete-test", () => {
  describe("deleteProjectTest", () => {
    it("deletes test from project", () => {
      const updatedProject = projectDeleteTest({
        project: MOCK_PROJECT_VIEW,
        lookupTestNameOrTitle: MOCK_TEST.name,
      });

      assert(!isResultError(updatedProject));

      expect(updatedProject.data.tests).not.toEqual(
        expect.arrayContaining([MOCK_TEST])
      );

      expect(updatedProject.data.testsByName[MOCK_TEST.name]).toBeUndefined();
    });
  });
});
