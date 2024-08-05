import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTest } from "./update-test";

export type UpdateTestDescription = Action<
  "update-test-description",
  {
    readonly lookupTestNameOrTitle: string;
    readonly newTestDescription: string;
  }
>;

export const projectUpdateTestDescription: ProjectAction<
  UpdateTestDescription
> = ({ project, lookupTestNameOrTitle, newTestDescription }) => {
  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      description: newTestDescription,
    },
  });
};
