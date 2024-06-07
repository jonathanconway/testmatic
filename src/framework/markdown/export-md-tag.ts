import { Tag } from "../core";
import { sentenceCase } from "../utils";

import { exportMdLink } from "./export-md-link";
import { TYPE_LINE_PREFIX } from "./md-tag";

export function exportMdTag(tag: Tag) {
  return `
# ${tag.title}

${tag.tagType ? `${TYPE_LINE_PREFIX} ${sentenceCase(tag.tagType)}` : ""}

${tag.description ?? ""}

## Links

${tag.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}
`
    .trimLines()
    .trim();
}
