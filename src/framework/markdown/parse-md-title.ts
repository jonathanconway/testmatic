import { Root } from "mdast";

import { assertNotEmptyString, assertNotNil } from "../utils";

import { getMdTextContent } from "./markdown.utils";
import { getTitleNode } from "./parse-md.utils";

export function parseMdTitle(root: Root) {
  const titleNode = getTitleNode(root);
  assertNotNil(titleNode?.children[0], "title first child", { titleNode });

  const title = getMdTextContent(titleNode?.children[0]);
  assertNotEmptyString(title, "title text", { titleNode });

  return title;
}
