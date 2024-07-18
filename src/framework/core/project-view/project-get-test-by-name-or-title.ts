import { NotFoundError } from "../../utils";

import { ProjectView } from "./project-view";

export function projectGetTestByNameOrTitle({
  project,
  lookupTestNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
}) {
  const testByName = project.testsByName[lookupTestNameOrTitle];
  if (testByName) {
    return testByName;
  }

  const testByTitle = project.tests.find(
    (test) => test.title === lookupTestNameOrTitle
  );
  if (!testByTitle) {
    return new NotFoundError(
      `Cannot find test with name or title matching "${lookupTestNameOrTitle}".`
    );
  }

  return testByTitle;
}
