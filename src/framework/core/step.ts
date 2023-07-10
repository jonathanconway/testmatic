import { Screen } from "./screen";
import { convertToSentenceCaseWithTokens } from "../utils";

export interface Step {
  readonly name: string;
  readonly toString: (...params: any[]) => string;
  readonly run: (...params: any[]) => Promise<void>;
  readonly screens: readonly Screen[];
}

export function createStepToString(name: string) {
  return function () {
    const title = convertToSentenceCaseWithTokens(name);
    return title;
  };
}

export function createStep(
  name: string,
  toString: (() => string) | undefined,
  run: () => Promise<void>,
  screens?: readonly Screen[]
): Step {
  return {
    name,
    toString: toString ?? createStepToString(name),
    run,
    screens: screens ?? [],
  };
}
