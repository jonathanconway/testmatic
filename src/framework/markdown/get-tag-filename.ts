import { TESTMATIC_ROOT_DIRNAME } from "../../const";
import { Tag } from "../core";

const defaultProjectPath = `./${TESTMATIC_ROOT_DIRNAME}`;

export function getTagFilename(tag: Tag, projectPath = defaultProjectPath) {
  return `${projectPath}/tags/${tag.name}.md`;
}

export function getTagFilenameRelative(tag: Tag) {
  return `./${tag.name}.md`;
}
