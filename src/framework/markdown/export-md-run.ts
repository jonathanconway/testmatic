import { Run, Test } from "../core";
import { formatDateTime, parseDateTimeString, sentenceCase } from "../utils";

import { exportMdLink } from "./export-md-link";
import { RESULT_LINE_PREFIX } from "./md-run";

export function exportMdTestRun(test: Test, run: Run) {
  return `
# ${test.title} - Run ${formatDateTime(parseDateTimeString(run.dateTime))}

${RESULT_LINE_PREFIX} ${run.result ? sentenceCase(run.result) : "-"}

## Links

${run.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}
`
    .trimLines()
    .trim();
}
