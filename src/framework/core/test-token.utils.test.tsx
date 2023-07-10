import { createTestWithTokensMocks } from "./test.mocks";
import { createTokensMock } from "./token.mocks";
import { getTestsHavingToken } from "./token.utils";

describe("test-token.utils", () => {
  describe("getTestsHavingToken", () => {
    it("returns tests whose name contain the token passed", () => {
      const tokens = createTokensMock();
      const tests = createTestWithTokensMocks(tokens);
      const [token0] = tokens;
      const [test0] = tests;

      const testsHavingToken = getTestsHavingToken(tests, token0);

      expect(testsHavingToken).toEqual([test0]);
    });
  });
});
