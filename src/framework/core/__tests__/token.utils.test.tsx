import { parseTokenNameAndTypes } from "../token.utils";

describe("token.utils", () => {
  describe("parseTokenNameAndTypes", () => {
    it("returns parsed step name and type objects", () => {
      const stepName = "step__token_one_a__and__token_two_b__and_finish";

      const parsedTokens = parseTokenNameAndTypes(stepName);

      expect(parsedTokens).toEqual([
        {
          name: "token_one",
          type: "a",
        },
        {
          name: "token_two",
          type: "b",
        },
      ]);
    });
  });
});
