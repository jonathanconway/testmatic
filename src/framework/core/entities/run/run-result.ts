import { TypeOfConst, sentenceCase } from "../../../utils";

export const RunResults = {
  Passed: "passed",
  Mixed: "mixed",
  Failed: "failed",
} as const;

const runResultsValues = Object.values(RunResults);

export type RunResult = TypeOfConst<typeof RunResults>;

export function formatRunResult(result?: RunResult) {
  const resultStringTrimmed = result?.trim() ?? "";

  if (!resultStringTrimmed || resultStringTrimmed === "-") {
    return "-";
  }

  return sentenceCase(resultStringTrimmed);
}

export function parseRunResult(resultString?: string): RunResult | undefined {
  const resultStringTrimmed = resultString?.trim() ?? "";

  if (!resultStringTrimmed || resultStringTrimmed === "-") {
    return undefined;
  }

  if ((runResultsValues as string[]).includes(resultStringTrimmed)) {
    return resultStringTrimmed as RunResult;
  }

  return undefined;
}
