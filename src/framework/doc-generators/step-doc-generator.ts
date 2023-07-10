import { writeFileSync } from "fs";
import { orderBy } from "lodash";
import { plural } from "pluralize";

import { getStepTokens, Step, Token } from "../core";
import {
  convertToSentenceCase,
  convertToSentenceCaseWithTokens,
} from "../utils";

export function generateStepTokenText(tokens: readonly Token[]) {
  const tokensByType = tokens.reduce((acc, token) => {
    acc[token.type] = acc[token.type] ?? [];
    acc[token.type].push(token);
    return acc;
  }, {} as Record<string, Token[]>);

  const tokenTypes = orderBy(Object.keys(tokensByType));

  const text = tokenTypes
    .map((type) =>
      `
### ${plural(convertToSentenceCase(type))}

${tokensByType[type].map((token) => `- ${token}\n`)}
  `.trim()
    )
    .join("");

  return text;
}

export function generateStepDocs(
  docsPath: string,
  steps: readonly Step[],
  tokens: readonly Token[]
) {
  for (const step of steps) {
    const stepText = `## Step: ${convertToSentenceCaseWithTokens(step.name)}\n`;

    const stepTokens = getStepTokens(step, tokens);

    const tokensText = "\n\n" + generateStepTokenText(stepTokens);

    writeFileSync(`${docsPath}/steps/${step.name}.md`, stepText + tokensText);
  }
}
