import { Token } from "../framework";
import { sentenceCase } from "../framework/utils";

export interface SearchStringToken extends Token {
  type: "search-string";
}

export function createSearchStringToken(name: string): SearchStringToken {
  return {
    type: "search-string",
    name,
    toString: () => `[${sentenceCase(name)}](../tokens/${name}.md)`,
  };
}
