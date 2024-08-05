import { isError } from "lodash";

import { projectGetTestByNameOrTitle } from "../queries";
import { isResultError, resultError } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTest } from "./update-test";

export type DeleteTestTag = Action<
  "delete-test-tag",
  {
    readonly lookupTestNameOrTitle: string;
    readonly lookupTagNameOrTitle: string;
  }
>;

export const projectDeleteTestTag: ProjectAction<DeleteTestTag> = ({
  project,
  lookupTestNameOrTitle,
  lookupTagNameOrTitle,
}) => {
  const test = projectGetTestByNameOrTitle({ project, lookupTestNameOrTitle });

  if (isError(test)) {
    return resultError(test);
  }

  const tags = test.tags.filter(
    (tag) =>
      tag.name !== lookupTagNameOrTitle && tag.title !== lookupTagNameOrTitle
  );

  const updatedProject = projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      tags,
    },
  });

  if (isResultError(updatedProject)) {
    return resultError(updatedProject.error);
  }

  return { ...updatedProject, message: "Test tag deleted." };
};
