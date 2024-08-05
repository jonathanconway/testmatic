import { fromPairs } from "lodash";

import { Project } from "../project";
import { Tag } from "../tag";
import { Test } from "../test";

export interface ProjectView extends Project {
  readonly testsByName: Record<string, Test>;
  readonly tagsByName: Record<string, Tag>;
  readonly tagsByTitle: Record<string, Tag>;
}

export function createProjectView(project: Project): ProjectView {
  return {
    ...project,
    testsByName: fromPairs(project.tests.map((test) => [test.name, test])),
    tagsByName: fromPairs(project.tags.map((test) => [test.name, test])),
    tagsByTitle: fromPairs(project.tags.map((test) => [test.title, test])),
  };
}
