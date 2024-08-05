import { TokensList } from "marked";

import {
  ProjectView,
  parseTagNames,
  projectGetOrCreateTagByName,
} from "../core";
import { getNextElements } from "../utils";

import { getMdListItemTexts, isMdList } from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdTestSteps(root: TokensList, project: ProjectView) {
  const headingsByText = getHeadingsNodesByText(root);

  const stepsHeading = headingsByText["Steps"];

  const stepsList = getNextElements(root, stepsHeading).find(isMdList);

  const stepTexts = stepsList ? getMdListItemTexts(stepsList) : [];

  const steps = stepTexts.map((text) => ({
    text,
    tags: parseTagNames(text).map(projectGetOrCreateTagByName(project)),
  }));

  return steps;
}
