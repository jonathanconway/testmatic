import { createStepMock } from "../step.mock";
import { createTest } from "../test";

describe("test", () => {
  describe("createTest", () => {
    it("creates a new test", async () => {
      const stepRun = jest.fn();
      const stepParam1 = "stepParam1";
      const stepParam2 = "stepParam2";

      const test = createTest({
        name: "name",
        title: "title",
        testStepAndParamPairs: [
          [createStepMock(stepRun), [stepParam1, stepParam2]],
        ],
      });

      expect(test).toEqual(
        expect.objectContaining({
          name: "name",
          run: expect.any(Function),
          testSteps: [
            {
              params: [stepParam1, stepParam2],
              step: {
                name: "mock-step",
                run: stepRun,
                screens: [],
                toString: expect.any(Function),
              },
              title: "mock-step",
            },
          ],
          title: "title",
        })
      );

      await test.run();

      expect(stepRun).toHaveBeenCalledWith([stepParam1, stepParam2]);
    });
  });
});
