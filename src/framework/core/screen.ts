import { convertToSentenceCaseWithTokens } from "../utils";

export interface Screen {
  readonly name: string;
  readonly title: string;
}

export function createScreen(name: string, title?: string): Screen {
  return {
    name,
    title: title ?? convertToSentenceCaseWithTokens(name),
  };
}
