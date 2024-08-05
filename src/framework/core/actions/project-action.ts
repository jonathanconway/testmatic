import { ProjectView } from "../entities";
import { ResultWithData } from "../result";

import { Action } from "./action";

export type ProjectAction<TAction extends Action<{}, {}>> = (
  params: { project: ProjectView } & TAction["params"]
) => ResultWithData<ProjectView>;
