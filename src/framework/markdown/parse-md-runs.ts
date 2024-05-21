import { Run } from "../core";
import { DirTree } from "../files";

export function parseMdRuns(runsDirTree: DirTree, testName: string): Run[] {
  const runs = Object.entries(runsDirTree[testName] ?? {}).flatMap(
    ([timestamp, runFiles]) => parseMdRun(timestamp, "")
  );

  return runs;
}

function parseMdRun(timestamp: string, runFile: string): Run {
  return {
    links: [],
    result: "passed",
    dateTime: timestamp,
  };
}
