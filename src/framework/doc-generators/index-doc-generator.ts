import { writeFileSync } from "fs";

import { Test, Token } from "../core";
import { convertToSentenceCase } from "../utils";
import { plural } from "pluralize";

export function generateIndexDoc(
  docsPath: string,
  tests: readonly Test[],
  tokens: readonly Token[]
) {
  const title = "# Test docs";

  const testsTitle = "## Tests";
  const testsList = tests
    .map((test) => `- [${test.title}](./tests/${test.name}.md)`)
    .join("\n");

  const tokensByType = tokens.reduce<Record<string, Token[]>>((map, token) => {
    map[token.type] = map[token.type] ?? [];
    map[token.type].push(token);
    return map;
  }, {});

  const tokensLists = Object.entries(tokensByType)
    .map(([type, tokens]) =>
      [
        `## ${plural(convertToSentenceCase(type))}`,
        tokens
          .map(
            (token) =>
              `- [${convertToSentenceCase(token.name)}](./tokens/${
                token.nameAndType
              }.md)`
          )
          .join("\n"),
      ].join("\n\n")
    )
    .join("\n\n");

  const indexText = [title, testsTitle, testsList, tokensLists].join("\n\n");

  writeFileSync(`${docsPath}/index.md`, indexText);
}
