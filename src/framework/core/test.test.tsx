import { createStepMock } from "./step.mock";
import { createTest } from "./test";

describe("test", () => {
  describe("createTest", () => {
    it("creates a new test", async () => {
      const stepRun = jest.fn();

      const test = createTest({
        name: "mock_test",
        steps: [createStepMock("mock_step", stepRun)],
      });

      expect(test).toEqual(
        expect.objectContaining({
          name: "mock_test",
          title: "Mock test",
          steps: [
            {
              name: "mock_step",
              title: "Mock step",
              run: expect.any(Function),
            },
          ],
          run: expect.any(Function),
        })
      );

      await test.run();

      expect(stepRun).toHaveBeenCalledWith();
    });
  });
});
