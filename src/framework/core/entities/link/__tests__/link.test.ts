import { createLinkFromInput } from "../link";

describe("link", () => {
  describe("createLinkFromInput", () => {
    it("creates a new tag from provided href", () => {
      const link = createLinkFromInput("http://product.com/login");

      expect(link).toEqual({
        href: "http://product.com/login",
      });
    });

    it("creates a new tag from provided title and href", () => {
      const link = createLinkFromInput("Login page|http://product.com/login");

      expect(link).toEqual({
        href: "http://product.com/login",
        title: "Login page",
      });
    });
  });
});
