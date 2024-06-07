import { Test } from "../core";

import { exportMdLink } from "./export-md-link";

export function exportMdTest(test: Test) {
  return `
# ${test.title}

${test.description ?? ""}

## Steps

${test.steps.map((step) => `- ${step.text}`).join("\n")}

## Links

${test.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}

## Tags

${test.tags.map((tag) => `- ${tag.title}`).join("\n")}
`
    .trimLines()
    .trim();
}
