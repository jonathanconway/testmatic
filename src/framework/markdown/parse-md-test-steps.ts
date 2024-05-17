import { List, Root } from "mdast";

import { Tag, parseTagNames } from "../core";
import { getNextElement } from "../utils";

import { getMdListItemTexts } from "./markdown.utils";
import {
  getHeadingsNodesByText,
  matchExistingOrCreateTag,
} from "./parse-md.utils";

export function parseMdTestSteps(
  root: Root,
  existingTagsByName: Record<string, Tag>
) {
  const headingsByText = getHeadingsNodesByText(root);
  const stepsHeading = headingsByText["Steps"];
  const stepsList = getNextElement(root.children, stepsHeading) as List;
  const stepTexts = getMdListItemTexts(stepsList);
  const steps = stepTexts.map((text) => ({
    text,
    tags: parseTagNames(text).map(matchExistingOrCreateTag(existingTagsByName)),
  }));
  return steps;
}
