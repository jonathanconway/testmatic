import { Screen } from "./screen";
import { sentenceCase } from "../utils";

export interface Step {
  readonly name: string;
  readonly toString: (...params: any[]) => string;
  readonly run: (...params: any[]) => Promise<void>;
  readonly screens: readonly Screen[];
}

export function createStepToString(name: string) {
  return function (...params: readonly any[]) {
    const title = sentenceCase(name);
    const paramTitles = params.map((param) => param.toString()).join(" ");

    return `${title} ${paramTitles}`;
  };
}

export function createStep(
  name: string,
  toString: ((...params: readonly any[]) => string) | undefined,
  run: (...params: any[]) => Promise<void>,
  screens: readonly Screen[] = []
): Step {
  return {
    name,
    toString: toString ?? createStepToString(name),
    run,
    screens,
  };
}
