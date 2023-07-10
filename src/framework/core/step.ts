import { convertToSentenceCaseWithTokens } from "../utils";

export interface Step {
  readonly name: string;
  readonly title: string;
  readonly run: () => Promise<void>;
}

export function createStep(name: string, run: () => Promise<void>): Step {
  return {
    name,
    title: convertToSentenceCaseWithTokens(name),
    run,
  };
}
