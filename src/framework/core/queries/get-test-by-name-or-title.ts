import { NotFoundError } from "../../utils";
import { ProjectView, Test } from "../entities";

export function projectGetTestByNameOrTitle({
  project,
  lookupTestNameOrTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
}): Test | Error {
  const testByName = project.testsByName[lookupTestNameOrTitle];

  if (testByName) {
    return testByName as Test;
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
