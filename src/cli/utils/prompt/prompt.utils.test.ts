const mockPrompt = jest.fn();
const mockPromptSync = jest.fn().mockReturnValue(mockPrompt);

jest.mock("prompt-sync", () => mockPromptSync);

describe("prompt.utils", () => {
  describe("promptFIelds", () => {
    it("promopts the user for each field provided and returns the inputs in an object", async () => {
      const { promptFields } = await import("./prompt.utils");

      mockPrompt.mockReturnValueOnce("mary");
      mockPrompt.mockReturnValueOnce("doe");

      const result = promptFields(["firstName", "lastName"]);

      expect(result).toEqual({ firstName: "mary", lastName: "doe" });
    });
  });
});
