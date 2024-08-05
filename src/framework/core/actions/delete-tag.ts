import { isError } from "lodash";
import pluralize from "pluralize";

import { DeleteReferencedError } from "../../utils";
import { createProjectView } from "../entities";
import { projectGetTagByNameOrTitle } from "../queries/get-tag-by-name-or-title";
import { projectGetTestsByTag } from "../queries/get-tests-by-tag";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type DeleteTag = Action<
  "delete-tag",
  {
    readonly lookupTagNameOrTitle: string;
  }
>;

export const projectDeleteTag: ProjectAction<DeleteTag> = ({
  project,
  lookupTagNameOrTitle,
}) => {
  const tag = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (isError(tag)) {
    return resultError(tag);
  }

  const tests = projectGetTestsByTag({
    project,
    tag,
  });

  if (tests.length > 0) {
    return resultError(
      new DeleteReferencedError(
        `Cannot delete tag with title "${
          tag.title
        }" because it is referenced by ${tests.length} ${pluralize(
          "tests",
          tests.length
        )}.`
      )
    );
  }

  const tags = project.tags.filter((tag) => tag.name !== lookupTagNameOrTitle);

  const projectView = createProjectView({
    ...project,
    tags,
  });

  return resultOkWithData(projectView, "Tag deleted.");
};
