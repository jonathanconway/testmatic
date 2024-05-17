import { ProjectView } from "./project-view";

export function getTestByNameOrTitle(
  projectView: ProjectView,
  nameOrTitle: string
) {
  const testByName = projectView.testsByName[nameOrTitle];
  if (testByName) {
    return testByName;
  }

  const testByTitle = projectView.tests.find(
    (test) => test.title === nameOrTitle
  );
  if (testByTitle) {
    return testByTitle;
  }

  throw new Error(
    `Cannot find test with name or title matching "${nameOrTitle}"`
  );
}
