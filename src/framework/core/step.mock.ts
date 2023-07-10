import { createStep } from "./step";

export function createStepMock(
  name: string = "mock-step",
  run = async () => {}
) {
  return createStep(name, run);
}

export function createStepMocks(names: readonly string[]) {
  return names.map((name) => createStepMock(name, async () => {}));
}
