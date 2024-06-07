import * as fs from "fs";

import { MOCK_PROJECT_JSON } from "../../../exporters";
import { readProjectFile, writeProjectFile } from "../project-json-file";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

const mockReadFileSync = jest.spyOn(fs, "readFileSync");
mockReadFileSync.mockReturnValue(JSON.stringify(MOCK_PROJECT_JSON));

const mockWriteFileSync = jest.spyOn(fs, "writeFileSync");

describe("project-json-file", () => {
  describe("readProjectFile", () => {
    it("reads project json file and returns project json object", () => {
      expect(readProjectFile()).toEqual(MOCK_PROJECT_JSON);
    });
  });

  describe("writeProjectFile", () => {
    it("reads project json file and returns project json object", () => {
      writeProjectFile(MOCK_PROJECT_JSON);

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        "project.json",
        JSON.stringify(MOCK_PROJECT_JSON, undefined, "  ")
      );
    });
  });
});
