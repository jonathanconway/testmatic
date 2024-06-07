import { MOCK_PROJECT_VIEW } from "../../core";
import { exportMd } from "../export-md";
import { MOCK_PROJECT_DIR_TREE } from "../export-md.mocks";

describe("export-md", () => {
  describe("exportMd", () => {
    it("exports project to set of md files and contents", () => {
      const output = exportMd(MOCK_PROJECT_VIEW);

      expect(output).toEqual(MOCK_PROJECT_DIR_TREE);
    });
  });
});
