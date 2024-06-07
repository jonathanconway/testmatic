import { ProjectView } from "../core";
import { DirFileTree } from "../files";
import "../utils";

import { exportMdTestRun } from "./export-md-run";
import { exportMdTag } from "./export-md-tag";
import { exportMdTest } from "./export-md-test";

export interface ProjectViewDirFileTree {
  readonly tests: Record<string, string>;
  readonly tags: Record<string, string>;
  readonly runs: Record<
    string,
    Record<string, Record<string, object | string>>
  >;
}

export function exportMd(project: ProjectView) {
  return {
    tests: project.tests
      .map((test) => [`${test.name}.md`, exportMdTest(test)])
      .toObject() as DirFileTree,

    tags: project.tags
      .map((tag) => [`${tag.name}.md`, exportMdTag(tag)])
      .toObject() as DirFileTree,

    runs: project.tests
      .map((test) => [
        test.name,

        test.runs
          .map((run) => [
            run.dateTime,
            {
              [`${run.dateTime}.md`]: exportMdTestRun(test, run),
            },
          ])
          .toObject() as DirFileTree,
      ])
      .toObject() as DirFileTree,
  } as ProjectViewDirFileTree;
}
