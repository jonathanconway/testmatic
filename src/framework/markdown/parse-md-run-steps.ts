import { TokensList } from "marked";

import { Tag, parseTagNames, projectGetOrCreateTagByName } from "../core";
import { getNextElements } from "../utils";

import { getMdCheckCheckListItems, isMdList } from "./markdown.utils";
import { getHeadingsNodesByText } from "./parse-md.utils";

export function parseMdRunSteps(
  root: TokensList,
  existingTagsByName: Record<string, Tag>
) {
  const headingsByText = getHeadingsNodesByText(root);

  const stepsHeading = headingsByText["Steps"];

  const stepsList = getNextElements(root, stepsHeading).find(isMdList);

  const stepTexts = stepsList ? getMdCheckCheckListItems(stepsList) : [];

  const steps = stepTexts.map((checkListItem) => ({
    text: checkListItem.text,
    isCompleted: checkListItem.checked,
    tags: parseTagNames(checkListItem.text).map(
      projectGetOrCreateTagByName(existingTagsByName)
    ),
  }));

  return steps;
}
