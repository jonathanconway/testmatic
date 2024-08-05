import { snakeCase } from "lodash";
import { TokensList } from "marked";

import { ProjectView, Tag, projectGetOrCreateTagByName } from "../core";
import { getNextElements, isNotNil } from "../utils";

import { getMdTextContent, isMdList, isMdListItem } from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdTestTags(root: TokensList, project: ProjectView) {
  const headingsByText = getHeadingsNodesByText(root);
  const tagsHeading = headingsByText["Tags"];

  if (!tagsHeading) {
    return [];
  }

  const tagsList = getNextElements(root, tagsHeading).find(isMdList);

  const tags: readonly Tag[] =
    tagsList?.items
      ?.filter(isMdListItem)
      .filter(isNotNil)
      .map(getMdTextContent)
      .map(snakeCase)
      .map(projectGetOrCreateTagByName(project)) ?? [];

  return tags;
}
