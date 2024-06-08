import { Tag } from "../../framework";

export function convertTagToOutputRow(tag: Tag) {
  return {
    title: tag.title.trimWithEllipsis(60),
    name: tag.name,
  };
}
