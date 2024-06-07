import * as fs from "fs";

import { MOCK_PROJECT_DIR_TREE } from "../../../markdown";
import { writeFileTree } from "../write-dir-file-tree";

jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

const mockExistsSync = jest.spyOn(fs, "existsSync");
mockExistsSync.mockImplementation((path: fs.PathLike) => {
  switch (true) {
    case path.toString().endsWith(".testmatic/tests"):
      return true;
    case path.toString().endsWith(".testmatic/tags"):
      return true;
    case path.toString().endsWith(".testmatic/runs"):
      return false;
    case path
      .toString()
      .endsWith(
        ".testmatic/runs/user_can_log_in_with_username_and_email_validation"
      ):
      return false;
  }
  return false;
});

const mockMkdirSync = jest.spyOn(fs, "mkdirSync");

const mockWriteFileSync = jest.spyOn(fs, "writeFileSync");

describe("write-dir-file-tree", () => {
  describe("writeFileTree", () => {
    it("writes the files and folders in the given dirFiletree to the given path in the file system", () => {
      writeFileTree(`.testmatic`, MOCK_PROJECT_DIR_TREE);

      const basePath = ".testmatic";

      const testsPath = `${basePath}/tests`;
      expect(mockExistsSync).toHaveBeenNthCalledWith(1, testsPath);
      expect(mockMkdirSync).not.toHaveBeenCalledWith(testsPath);

      const tagsPath = `${basePath}/tags`;
      expect(mockExistsSync).toHaveBeenNthCalledWith(2, tagsPath);
      expect(mockMkdirSync).not.toHaveBeenCalledWith(tagsPath);

      const runsPath = `${basePath}/runs`;
      expect(mockExistsSync).toHaveBeenNthCalledWith(3, runsPath);
      expect(mockMkdirSync).toHaveBeenCalledWith(runsPath);

      const testsLogIn = "user_can_log_in_with_username_and_email_validation";
      const testsLogInFilename = `${testsLogIn}.md`;
      const testsLogInPath = `${testsPath}/${testsLogInFilename}`;

      const runsLogInPath = `${runsPath}/${testsLogIn}`;
      expect(mockExistsSync).toHaveBeenNthCalledWith(4, runsLogInPath);
      expect(mockMkdirSync).toHaveBeenCalledWith(runsLogInPath);

      const runDates = ["2024-04-30_20-45", "2024-04-30_20-43"];
      for (const runDate of runDates) {
        const runDatePath = `${runsLogInPath}/${runDate}`;
        expect(mockExistsSync).toHaveBeenCalledWith(runDatePath);
        expect(mockMkdirSync).toHaveBeenCalledWith(runDatePath);

        const runDateFilename = `${runDate}.md`;
        const runDatePathFilename = `${runDatePath}/${runDateFilename}`;

        expect(mockWriteFileSync).toHaveBeenCalledWith(
          runDatePathFilename,
          MOCK_PROJECT_DIR_TREE.runs[testsLogIn][runDate][runDateFilename]
        );
      }

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        testsLogInPath,
        MOCK_PROJECT_DIR_TREE.tests[testsLogInFilename]
      );

      const tags = [
        "log_in_flow",
        "login_screen",
        "username_field",
        "log_in_via_email_button",
        "log_in_via_email_button",
      ];
      for (const tag of tags) {
        const tagPath = `${tagsPath}/${tag}.md`;
        expect(mockWriteFileSync).toHaveBeenCalledWith(
          tagPath,
          MOCK_PROJECT_DIR_TREE.tags[`${tag}.md`]
        );
      }
    });
  });
});
