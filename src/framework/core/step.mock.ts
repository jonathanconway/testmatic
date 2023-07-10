import { createStep } from "./step";

export function createStepMock(
  name: string = "mock-step",
  run: () => Promise<void> = async () => {}
) {
  return createStep(name, () => name, run);
}
