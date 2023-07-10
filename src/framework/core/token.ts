import { convertToSentenceCaseWithTokens } from "../utils";

export interface Token {
  readonly type: string;
  readonly name: string;
  readonly nameAndType: string;
  readonly title: string;
  readonly toString: () => string;
}

export function createToken(name: string, type: string) {
  const sentenceName = convertToSentenceCaseWithTokens(name);
  const sentenceType = convertToSentenceCaseWithTokens(type);
  const title = `${sentenceType}: ${sentenceName}`;
  return {
    name,
    type,
    nameAndType: `${name}_${type}`,
    title,
    toString() {
      return `[${sentenceName}](../tokens/${name}_${type}.md)`;
    },
  };
}
