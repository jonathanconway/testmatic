import { isError } from "lodash";

import { AlreadyExistsError, isNotFoundError } from "../../utils";
import { createTitleFromName } from "../../utils/name.utils";
import {
  ProjectView,
  Step,
  Tag,
  Test,
  createProjectView,
  tagCreateNameFromTitle,
} from "../entities";
import { projectGetTagByNameOrTitle, projectGetTagByTitle } from "../queries";
import { resultError, resultOkWithData } from "../result";

import { Action } from "./action";
import { ProjectAction } from "./project-action";

export type UpdateTag = Action<
  "update-test-description",
  {
    readonly lookupTagNameOrTitle: string;
    readonly updatedTag: Tag;
  }
>;

export const projectUpdateTag: ProjectAction<UpdateTag> = ({
  project,
  lookupTagNameOrTitle,
  updatedTag,
}) => {
  const previousTag = projectGetTagByNameOrTitle({
    project,
    lookupTagNameOrTitle,
  });

  if (isError(previousTag)) {
    return resultError(previousTag);
  }

  const correctedUpdatedTag = correctUpdatedTag({
    project,
    previousTag,
    updatedTag,
  });

  if (isError(correctedUpdatedTag)) {
    return resultError(correctedUpdatedTag);
  }

  const updatedTests = project.tests.map((test: Test) => ({
    ...test,
    steps: test.steps.map((step: Step) => ({
      ...step,
      text: step.text.replaceAll(
        `(${previousTag.title.toLowerCase().trim()})`,
        `(${correctedUpdatedTag.title.toLowerCase().trim()})`
      ),
      tags: step.tags.upsert("name", previousTag.name, correctedUpdatedTag),
    })),
    tags: test.tags.upsert("name", previousTag.name, correctedUpdatedTag),
  }));

  const updatedTags = project.tags.upsert(
    "name",
    previousTag.name,
    correctedUpdatedTag
  );

  const projectView = createProjectView({
    tests: updatedTests,
    tags: updatedTags,
  });

  return resultOkWithData(projectView);
};

function correctUpdatedTag({
  project,
  previousTag,
  updatedTag,
}: {
  readonly project: ProjectView;
  readonly previousTag: Tag;
  readonly updatedTag: Tag;
}) {
  if (updatedTag.title !== previousTag.title) {
    return correctUpdatedTagTitle({
      project,
      updatedTag,
    });
  }

  if (updatedTag.name !== previousTag.name) {
    return correctUpdatedTagName({
      project,
      updatedTag,
    });
  }

  return updatedTag;
}

function correctUpdatedTagTitle({
  project,
  updatedTag,
}: {
  readonly project: ProjectView;
  readonly updatedTag: Tag;
}) {
  const tagWithSameTitleExists = !isNotFoundError(
    projectGetTagByTitle({ project, lookupTagTitle: updatedTag.title })
  );

  if (tagWithSameTitleExists) {
    return new AlreadyExistsError(
      `Tag with title "${updatedTag.title}" already exists.`
    );
  }

  return {
    ...updatedTag,
    name: tagCreateNameFromTitle(updatedTag.title),
  };
}

function correctUpdatedTagName({
  project,
  updatedTag,
}: {
  readonly project: ProjectView;
  readonly updatedTag: Tag;
}) {
  const tagWithSameNameExists = Boolean(project.tagsByName[updatedTag.name]);

  if (tagWithSameNameExists) {
    return new AlreadyExistsError(
      `Tag with name "${updatedTag.name}" already exists.`
    );
  }

  return {
    ...updatedTag,
    title: createTitleFromName(updatedTag.name),
  };
}
