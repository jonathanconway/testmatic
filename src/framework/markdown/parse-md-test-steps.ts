import { TokensList } from "marked";

import { Tag, parseTagNames } from "../core";
import { getNextElements } from "../utils";

import { getMdListItemTexts, isMdList } from "./markdown.utils";
import {
  getHeadingsNodesByText,
  matchExistingOrCreateTag,
} from "./parse-md.utils";

export function parseMdTestSteps(
  root: TokensList,
  existingTagsByName: Record<string, Tag>
) {
  const headingsByText = getHeadingsNodesByText(root);

  const stepsHeading = headingsByText["Steps"];

  const stepsList = getNextElements(root, stepsHeading).find(isMdList);

  const stepTexts = stepsList ? getMdListItemTexts(stepsList) : [];

  const steps = stepTexts.map((text) => ({
    text,
    tags: parseTagNames(text).map(matchExistingOrCreateTag(existingTagsByName)),
  }));

  return steps;
}
