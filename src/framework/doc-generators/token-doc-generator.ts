import { writeFileSync } from "fs";

import { Token } from "../core/token";
import { sentenceCase } from "../utils";

export function generateTokenDoc(token: Token) {
  const lines = [`## ${sentenceCase(token.name)}\n`];
  const text = lines.join("\n");

  writeFileSync(`docs/tokens/${token.name}.md`, text);
}

export function generateTokenDocs(tokens: readonly Token[]) {
  tokens.forEach(generateTokenDoc);
}
