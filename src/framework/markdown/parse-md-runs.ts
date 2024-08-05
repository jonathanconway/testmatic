import { isObject } from "lodash";

import { ProjectView, Run } from "../core";
import { DirFileTree } from "../files";
import { isNotNil } from "../utils";

import { parseMdRun } from "./parse-md-run";

export function parseMdRuns(
  runsDirFileTree: DirFileTree,
  testName: string,
  project: ProjectView
): Run[] {
  const runsTestDir = Object.entries(runsDirFileTree[testName] ?? {});

  const runsTestDirRuns = runsTestDir.filter(([timestamp, dir]) =>
    isObject(dir)
  );

  const runs = runsTestDirRuns
    .map(([timestamp, runDir]) => parseMdRun(timestamp, runDir, project))
    .filter(isNotNil);

  return runs;
}
