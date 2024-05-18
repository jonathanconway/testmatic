import { ProjectView } from "./project-view";

export function getTestByNameOrTitle({
  project,
  nameOrTitle,
}: {
  readonly project: ProjectView;
  readonly nameOrTitle: string;
}) {
  const testByName = project.testsByName[nameOrTitle];
  if (testByName) {
    return testByName;
  }

  const testByTitle = project.tests.find((test) => test.title === nameOrTitle);
  if (testByTitle) {
    return testByTitle;
  }

  throw new Error(
    `Cannot find test with name or title matching "${nameOrTitle}"`
  );
}
