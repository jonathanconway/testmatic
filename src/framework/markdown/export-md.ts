import { ProjectView } from "../core";
import { DirOrFileTree } from "../files";
import "../utils";

import { exportMdTag } from "./export-md-tag";
import { exportMdTest } from "./export-md-test";
import { exportMdTestRun } from "./export-md-test-run";

export function exportMd(project: ProjectView) {
  return {
    tests: project.tests
      .map((test) => [`${test.name}.md`, exportMdTest(test)])
      .toObject() as DirOrFileTree,

    tags: project.tags
      .map((tag) => [`${tag.name}.md`, exportMdTag(tag)])
      .toObject() as DirOrFileTree,

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
          .toObject() as DirOrFileTree,
      ])
      .toObject() as DirOrFileTree,
  };
}
