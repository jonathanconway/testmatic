import { createCommand } from "commander";
import prompts from "prompts";

import { projectMdCreateFolders, projectMdRead } from "../../framework";
import { toAsciiTable } from "../ascii.utils";

import { filterByArgsTag } from "./test-list-filter-tag";
import { convertTestToTestOutputRow } from "./test-list-output-row";

interface TestListParameters {
  readonly tag?: string;
}

export const cliTestListCommand = createCommand("list")
  .description("List tests in the current project")
  .option("-t, --tag <value>", "Filter by tag")
  .action(cliTestList);

export async function cliTestList(args: TestListParameters) {
  const project = projectMdRead();

  if (!project) {
    const { createProjectFolder } = await prompts({
      type: "confirm",
      name: "createProjectFolder",
      message:
        'Cannot find ".testmatic" folder in current working directory. Create?',
    });

    if (createProjectFolder) {
      projectMdCreateFolders();
      cliTestList(args);
    }

    return;
  }

  const { tag } = args;
  const { tests } = project;

  const testsFiltered = filterByArgsTag({ tests, tagFilterValue: tag });

  const testList = testsFiltered.map(convertTestToTestOutputRow);

  console.log(toAsciiTable(testList, ["Title", "Doc"]));
}
