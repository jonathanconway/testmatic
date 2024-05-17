import { MOCK_NEW_TAG_ONE, MOCK_TAG } from "../../tag";
import { addProjectTag } from "../project-add-tag";
import { MOCK_PROJECT_VIEW } from "../project-view.mocks";

describe("project-add-tag", () => {
  describe("addProjectTag", () => {
    it("adds the provided tag to the provided project", () => {
      const updatedProjectView =
        addProjectTag(MOCK_PROJECT_VIEW)(MOCK_NEW_TAG_ONE);

      expect(updatedProjectView.tags).toEqual([
        ...MOCK_PROJECT_VIEW.tags,
        MOCK_NEW_TAG_ONE,
      ]);

      expect(updatedProjectView.tagsByName).toEqual({
        ...MOCK_PROJECT_VIEW.tagsByName,
        [MOCK_NEW_TAG_ONE.name]: MOCK_NEW_TAG_ONE,
      });
    });

    it("does not overwrite tag that already exists", () => {
      expect(() => {
        addProjectTag(MOCK_PROJECT_VIEW)({
          ...MOCK_TAG,
          description: "desc",
        });
      }).toThrow();
    });
  });
});
