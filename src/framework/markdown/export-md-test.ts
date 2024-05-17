import { Test } from "../core";
import { trimLines } from "../utils";

import { exportMdLink } from "./export-md-link";

export function exportMdTest(test: Test) {
  return trimLines(`
# ${test.title}

${test.description ?? ""}

## Steps

${test.steps.map((step) => `- ${step.text}`).join("\n")}

## Links

${test.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}

## Tags

${test.tags.map((tag) => `- ${tag.title}`).join("\n")}
`);
}
