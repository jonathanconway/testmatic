import { NotFoundError } from "../../utils";

import { ProjectView } from "./project-view";

export function projectGetTestByNameOrTitle({
  project,
  testNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly testNameOrTitle: string;
}) {
  const testByName = project.testsByName[testNameOrTitle];
  if (testByName) {
    return testByName;
  }

  const testByTitle = project.tests.find(
    (test) => test.title === testNameOrTitle
  );
  if (!testByTitle) {
    return new NotFoundError(
      `Cannot find test with name or title matching "${testNameOrTitle}".`
    );
  }

  return testByTitle;
}
