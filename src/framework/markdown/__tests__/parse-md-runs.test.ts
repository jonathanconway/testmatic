import { MOCK_RUNS_LOG_IN } from "../../core";
import { MOCK_RUNS_DIR_FILE_TREE } from "../md-run.mocks";
import { parseMdRuns } from "../parse-md-runs";

describe("parse-md-runs", () => {
  describe("parseMdRuns", () => {
    it("correctly converts directories and markdown files to runs", () => {
      const result = parseMdRuns(
        MOCK_RUNS_DIR_FILE_TREE,
        "user_can_log_in_with_username_and_email_validation"
      );

      expect(result).toEqual(MOCK_RUNS_LOG_IN);
    });
  });
});
