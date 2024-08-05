import { TokensList } from "marked";

import {
  ProjectView,
  parseTagNames,
  projectGetOrCreateTagByName,
} from "../core";
import { getNextElements } from "../utils";

import { getMdCheckCheckListItems, isMdList } from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdRunSteps(root: TokensList, project: ProjectView) {
  const headingsByText = getHeadingsNodesByText(root);

  const stepsHeading = headingsByText["Steps"];

  const stepsList = getNextElements(root, stepsHeading).find(isMdList);

  const stepTexts = stepsList ? getMdCheckCheckListItems(stepsList) : [];

  const steps = stepTexts.map((checkListItem) => ({
    text: checkListItem.text,
    isCompleted: checkListItem.checked,
    tags: parseTagNames(checkListItem.text).map(
      projectGetOrCreateTagByName(project)
    ),
  }));

  return steps;
}
