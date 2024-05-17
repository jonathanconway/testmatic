import { Tag } from "../core";
import { sentenceCase, trimLines } from "../utils";

import { exportMdLink } from "./export-md-link";

export function exportMdTag(tag: Tag) {
  return trimLines(`
# ${tag.title}

${tag.type ? `Type: ${sentenceCase(tag.type)}` : ""}

${tag.description ?? ""}

## Links

${tag.links.map((link) => `- ${exportMdLink(link)}`).join("\n")}
`);
}
