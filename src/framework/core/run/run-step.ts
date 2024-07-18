import { Step } from "../step";

export interface RunStep extends Step {
  readonly isCompleted: boolean;
}
