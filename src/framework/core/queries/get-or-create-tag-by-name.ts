import { ProjectView, Tag, createTagFromName } from "../entities";

export function projectGetOrCreateTagByName(project: ProjectView) {
  return (tagName: string) => {
    return (project.tagsByName[tagName] as Tag) ?? createTagFromName(tagName);
  };
}
