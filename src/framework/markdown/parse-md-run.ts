import { isObject, isString } from "lodash";
import { marked } from "marked";

import { RUN_RECORDING_EXTENSIONS, Run, RunResult, Tag } from "../core";
import { DirFileTree } from "../files";
import { hasOneOfExtensions } from "../utils";

import { getRunFilename } from "./get-run-filename";
import { RESULT_LINE_PREFIX } from "./md-run";
import { parseMdRunSteps } from "./parse-md-run-steps";
import {
  parseDescriptionJoinedByNotPrefix,
  parseDescriptionLineByPrefix,
  parseDescriptionLines,
} from "./parse-md.utils";

export function parseMdRun(
  dateTime: string,
  runDir: DirFileTree | string | undefined,
  existingTagsByName: Record<string, Tag>
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

  const steps = parseMdRunSteps(root, existingTagsByName);

  return {
    dateTime,
    description,
    result,
    links: [],
    recordings,
    steps,
  };
}

function parseMdRunResult(descriptions: readonly string[]) {
  return parseDescriptionLineByPrefix(
    descriptions,
    RESULT_LINE_PREFIX
  ) as RunResult;
}
