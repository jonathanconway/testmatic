import { Run, Test } from "../core";
import { formatDateTime, parseDateTimeString, sentenceCase } from "../utils";

import { exportMdLink } from "./export-md-link";
import { RESULT_LINE_PREFIX } from "./md-run";

export function exportMdTestRun(test: Test, run: Run) {
  return `
# ${test.title} - Run ${formatDateTime(parseDateTimeString(run.dateTime))}

${RESULT_LINE_PREFIX} ${run.result ? sentenceCase(run.result) : "-"}

## Steps

${run.steps
  .map((step) => `- [${step.isCompleted ? "x" : " "}] ${step.text}`)
  .join("\n")}

## Links

${run.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}
`
    .trimLines()
    .trim();
}
