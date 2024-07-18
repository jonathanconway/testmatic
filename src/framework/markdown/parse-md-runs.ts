import { isObject } from "lodash";

import { Run, Tag } from "../core";
import { DirFileTree } from "../files";
import { isNotNil } from "../utils";

import { parseMdRun } from "./parse-md-run";

export function parseMdRuns(
  runsDirFileTree: DirFileTree,
  testName: string,
  existingTagsByName: Record<string, Tag>
): Run[] {
  const runsTestDir = Object.entries(runsDirFileTree[testName] ?? {});

  const runsTestDirRuns = runsTestDir.filter(([timestamp, dir]) =>
    isObject(dir)
  );

  const runs = runsTestDirRuns
    .map(([timestamp, runDir]) =>
      parseMdRun(timestamp, runDir, existingTagsByName)
    )
    .filter(isNotNil);

  return runs;
}
