import { MOCK_PROJECT_VIEW } from "../../../core";
import {
  convertProjectJSONToProject,
  convertProjectToProjectJSON,
} from "../project-json";
import { MOCK_PROJECT_JSON } from "../project-json.mocks";

describe("project-json", () => {
  describe("convertProjectToProjectJSON", () => {
    it("converts project view to project json", () => {
      const result = convertProjectToProjectJSON(MOCK_PROJECT_VIEW);

      expect(result).toEqual(MOCK_PROJECT_JSON);
    });
  });

  describe("convertProjectJSONToProject", () => {
    it("converts project json to project view", () => {
      const result = convertProjectJSONToProject(MOCK_PROJECT_JSON);

      expect(result.tests).toEqual(MOCK_PROJECT_VIEW.tests);
    });
  });
});
