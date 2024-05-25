import { Tag, createTagFromName } from "../tag";

export function projectGetOrCreateTagByName(tagsByName: Record<string, Tag>) {
  return (tagName: string) => {
    return tagsByName[tagName] ?? createTagFromName(tagName);
  };
}
