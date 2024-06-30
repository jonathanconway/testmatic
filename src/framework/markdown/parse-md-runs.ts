import { isObject, isString } from "lodash";
import { marked } from "marked";

import { RUN_RECORDING_EXTENSIONS, Run, RunResult } from "../core";
import { DirFileTree } from "../files";
import { hasOneOfExtensions, isNotNil } from "../utils";

import { getRunFilename } from "./get-run-filename";
import { RESULT_LINE_PREFIX } from "./md-run";
import {
  parseDescriptionJoinedByNotPrefix,
  parseDescriptionLineByPrefix,
  parseDescriptionLines,
} from "./parse-md.utils";

export function parseMdRuns(
  runsDirFileTree: DirFileTree,
  testName: string
): Run[] {
  const runsTestDir = Object.entries(runsDirFileTree[testName] ?? {});

  const runsTestDirRuns = runsTestDir.filter(([timestamp, dir]) =>
    isObject(dir)
  );

  const runs = runsTestDirRuns
    .map(([timestamp, runDir]) => parseMdRun(timestamp, runDir))
    .filter(isNotNil);

  return runs;
}

function parseMdRun(
  dateTime: string,
  runDir: DirFileTree | string | undefined
): Run | undefined {
  if (!isObject(runDir)) {
    // Todo: report error here
    return undefined;
  }

  const runMdFilename = getRunFilename(dateTime);
  if (!isString(runDir[runMdFilename])) {
    // Todo: report error here
    return undefined;
  }

  const source = runDir[runMdFilename] as string;

  const root = marked.lexer(source);

  const descriptions = parseDescriptionLines(root);

  const description = parseDescriptionJoinedByNotPrefix(descriptions, [
    RESULT_LINE_PREFIX,
  ]);

  const result = parseMdRunResult(descriptions);

  const files = Object.keys(runDir);

  const recordings = files.filter(hasOneOfExtensions(RUN_RECORDING_EXTENSIONS));

  return {
    dateTime,
    description,
    result,
    links: [],
    recordings,
  };
}

function parseMdRunResult(descriptions: readonly string[]) {
  return parseDescriptionLineByPrefix(
    descriptions,
    RESULT_LINE_PREFIX
  ) as RunResult;
}
