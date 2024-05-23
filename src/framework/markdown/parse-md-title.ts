import { TokensList } from "marked";

import { assertNotEmptyString } from "../utils";

import { getTitleNode } from "./parse-md.utils";

export function parseMdTitle(root: TokensList) {
  const titleNode = getTitleNode(root);

  const title = titleNode.text;
  assertNotEmptyString(title, "title text", { titleNode });

  return title;
}
