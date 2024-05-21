import { MOCK_TEST } from "../../test";
import { projectDeleteTest } from "../project-delete-test";
import { MOCK_PROJECT_VIEW } from "../project-view.mocks";

describe("project-delete-test", () => {
  describe("deleteProjectTest", () => {
    it("deletes test from project", () => {
      const updatedProject = projectDeleteTest({
        project: MOCK_PROJECT_VIEW,
        testToDelete: MOCK_TEST,
      });

      expect(updatedProject.tests).not.toEqual(
        expect.arrayContaining([MOCK_TEST])
      );

      expect(updatedProject.testsByName[MOCK_TEST.name]).toBeUndefined();
    });
  });
});
