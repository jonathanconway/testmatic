import { ProjectView, Test } from "../../core";
import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { filterByArgsTag } from "./test-list-filter-tag";
import { convertTestToTestOutputRow } from "./test-list-output-row";

export function cliTestList(args: readonly string[]) {
  const projectView = readProject();

  const testsFiltered = filterByArgs(args, projectView.tests, projectView);

  const testList = testsFiltered.map(convertTestToTestOutputRow);

  console.log(toAsciiTable(testList));
}

function filterByArgs(
  args: readonly string[],
  tests: readonly Test[],
  project: ProjectView
): Array<Test> {
  return filterByArgsTag(args, tests, project);
}
