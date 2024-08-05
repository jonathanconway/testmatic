import { sentenceCase } from "../../utils";
import { ProjectView, testCreateNameFromTitle } from "../entities";

import { Action } from "./action";
import { ProjectAction } from "./project-action";
import { projectUpdateTest } from "./update-test";

export type UpdateTestTitle = Action<
  "update-test-title",
  {
    readonly lookupTestNameOrTitle: string;
    readonly newTestTitle: string;
  }
>;

export const projectUpdateTestTitle: ProjectAction<UpdateTestTitle> = ({
  project,
  lookupTestNameOrTitle,
  newTestTitle,
}) => {
  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      name: testCreateNameFromTitle(newTestTitle),
      title: sentenceCase(newTestTitle),
    },
  });
};
