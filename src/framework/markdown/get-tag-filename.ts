import { Tag } from "../core";

export function getTagFilename(tag: Tag) {
  return `./.testmatic/tags/${tag.name}.md`;
}

export function getTagFilenameRelative(tag: Tag) {
  return `./${tag.name}.md`;
}
