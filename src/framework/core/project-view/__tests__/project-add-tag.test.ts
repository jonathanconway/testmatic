import { isError } from "lodash";

import { MOCK_NEW_TAG_ONE } from "../../tag";
import { MOCK_PROJECT_VIEW } from "../project-view.mocks";

describe("project-add-tag", () => {
  describe("addProjectTag", () => {
    it("adds the provided tag to the provided project", async () => {
      const { projectAddTag } = await import("../project-add-tag");

      const updatedProjectView = projectAddTag({
        project: MOCK_PROJECT_VIEW,
        newTag: MOCK_NEW_TAG_ONE,
      });

      if (isError(updatedProjectView)) {
        throw updatedProjectView;
      }

      expect(updatedProjectView.tags).toEqual([
        ...MOCK_PROJECT_VIEW.tags,
        MOCK_NEW_TAG_ONE,
      ]);

      expect(updatedProjectView.tagsByName).toEqual({
        ...MOCK_PROJECT_VIEW.tagsByName,
        [MOCK_NEW_TAG_ONE.name]: MOCK_NEW_TAG_ONE,
      });
    });
  });
});
