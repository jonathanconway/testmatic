import { createCommand } from "commander";

import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

import { filterByArgsTag } from "./test-list-filter-tag";
import { convertTestToTestOutputRow } from "./test-list-output-row";

interface TestListParameters {
  readonly tag?: string;
}

export const cliTestListCommand = createCommand("list")
  .description("List tests in the current project")
  .option("-t, --tag <value>", "Filter by tag")
  .action(cliTestList);

export function cliTestList({ tag }: TestListParameters) {
  const { tests } = readProject();

  const testsFiltered = filterByArgsTag({ tests, tagFilterValue: tag });

  const testList = testsFiltered.map(convertTestToTestOutputRow);

  console.log(toAsciiTable(testList, ["Title", "Doc"]));
}
