import { createToken } from "./token";

describe("token", () => {
  describe("createToken", () => {
    it("returns correctly structured token", () => {
      const token = createToken("login", "screen");

      expect(token).toEqual(
        expect.objectContaining({
          name: "login",
          type: "screen",
          nameAndType: "login_screen",
          title: "Screen: Login",
        })
      );
    });
  });

  describe("token.toString", () => {
    it("returns correctly formatted markdown link", () => {
      const token = createToken("create_account", "screen");
      expect(token.toString()).toEqual(
        "[Create account](../tokens/create_account_screen.md)"
      );
    });
  });
});
