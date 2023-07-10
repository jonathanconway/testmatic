import { convertToSentenceCaseWithTokens } from "../utils";

export interface Token {
  readonly type: string;
  readonly name: string;
  readonly nameAndType: string;
  readonly toString: () => string;
  readonly getDocTitle: () => string;
}

export function createToken(name: string, type: string) {
  const sentenceName = convertToSentenceCaseWithTokens(name);
  const sentenceType = convertToSentenceCaseWithTokens(type);
  const sentenceTypeName = `${sentenceType}: ${sentenceName}`;
  return {
    type,
    name,
    nameAndType: `${name}_${type}`,
    toString() {
      return `[${sentenceName}](../tokens/${name}_${type}.md)`;
    },
    getDocTitle() {
      return sentenceTypeName;
    },
  };
}
