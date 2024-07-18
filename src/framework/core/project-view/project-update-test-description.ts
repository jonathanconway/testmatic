import { projectUpdateTest } from "./project-update-test";
import { ProjectView } from "./project-view";

export function projectUpdateTestDescription({
  project,
  lookupTestNameOrTitle,
  newTestDescription,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly newTestDescription: string;
}) {
  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      description: newTestDescription,
    },
  });
}
