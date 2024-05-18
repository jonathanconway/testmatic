import { readdirSync } from "fs";

import { Run, Test } from "../core";
import { DirTree } from "../files";

export function parseMdRuns(runsDirTree: DirTree, testName: string): Run[] {
  // console.log("parseMdRuns", { runsDirTree, testName });
  // const dirTree: DirTree = {};

  // readdirSync()
  // projec

  const runs = Object.entries(runsDirTree[testName] ?? {}).flatMap(
    ([timestamp, runFiles]) => parseMdRun(timestamp, "")
  );

  return runs;
}

// function parseTimestamp(timestamp: string) {
//   const [date, time] = timestamp.split("_");
//   const dateTime = new Date(`${date} ${time.replaceAll("-", ":")}`);
// }

function parseMdRun(timestamp: string, runFile: string): Run {
  // const runMd = readFileSync(runFile).toString();

  return {
    links: [],
    result: "passed",
    dateTime: timestamp,
  };
}
