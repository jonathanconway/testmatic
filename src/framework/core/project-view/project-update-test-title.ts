import { sentenceCase } from "../../utils";
import { testCreateNameFromTitle } from "../test";

import { projectUpdateTest } from "./project-update-test";
import { ProjectView } from "./project-view";

export function projectUpdateTestTitle({
  project,
  lookupTestNameOrTitle,
  newTestTitle,
}: {
  readonly project: ProjectView;
  readonly lookupTestNameOrTitle: string;
  readonly newTestTitle: string;
}) {
  return projectUpdateTest({
    project,
    lookupTestNameOrTitle,
    updateTestChanges: {
      name: testCreateNameFromTitle(newTestTitle),
      title: sentenceCase(newTestTitle),
    },
  });
}
