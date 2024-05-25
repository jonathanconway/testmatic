import { Run, Test } from "../core";
import { formatDateTime, parseDateTimeString, sentenceCase } from "../utils";

import { exportMdLink } from "./export-md-link";

export function exportMdTestRun(test: Test, run: Run) {
  return `
# ${test.title} - Run ${formatDateTime(parseDateTimeString(run.dateTime))}

Result: ${run.result ? sentenceCase(run.result) : "-"}

## Links

${run.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}
`
    .trimLines()
    .trim();
}
