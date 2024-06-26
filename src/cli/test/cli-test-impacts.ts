import { createCommand } from "commander";

import {
  Test,
  getTestImpactedTests,
  isError,
  projectGetTestByNameOrTitle,
  projectMdRead,
  pruneImpactItems,
} from "../../framework";
import { logError, logHeading, logImpacts } from "../utils";

import { PARAM_TEST_NAME_OR_TITLE } from "./param-test-name-or-title";

type TestImpactsParameter = string /* testNameOrTitle */;

export const cliTestImpactsCommand = createCommand("impacts")
  .description(
    "List the tests and tags that are impacted by any of a test's tags"
  )
  .argument(PARAM_TEST_NAME_OR_TITLE.name, PARAM_TEST_NAME_OR_TITLE.description)
  .action(cliTestImpacts);

export function cliTestImpacts(testNameOrTitle: TestImpactsParameter) {
  const project = projectMdRead();
  if (!project) {
    return;
  }

  const getTestResult = projectGetTestByNameOrTitle({
    project,
    testNameOrTitle,
  });
  if (isError(getTestResult)) {
    logError(getTestResult.message);
    return;
  }

  const test = getTestResult;

  const impacts = pruneImpactItems(
    getTestImpactedTests({
      tests: project.tests,
      test,
      depth: 2,
    })
  );

  logTitle(test);

  logImpacts(impacts);
}

function logTitle(test: Test) {
  const title = `Test: ${test.title}`;

  logHeading(title, 1);

  logHeading("Impacts", 2);
}
