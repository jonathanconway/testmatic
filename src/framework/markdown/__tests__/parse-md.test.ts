import { MOCK_TAG_LOGIN_FLOW, MOCK_TAG_LOGIN_SCREEN, Tag } from "../../core";
import { MOCK_TAG, MOCK_TEST, MOCK_TEST_WITH_MAPPED_TAGS } from "../../core";
import { parseMdTag } from "../parse-md-tag";
import { parseMdTest } from "../parse-md-test";

describe("parse-md", () => {
  describe("parseMdTag", () => {
    it("correctly converts markdown to tag", async () => {
      const tag = parseMdTag(
        `
# Log in flow

Type: Flow

This flow covers an existing user logging into the website.

## Notes

- It assumes the user already has an account
- It assumes the user is accessing the website from a supported location

## Links

- [Docs](http://docs.testmatic.com/flows/login)
    `.trim()
      );

      expect(tag).toEqual(MOCK_TAG);
    });
  });

  describe("parseMdTest", () => {
    it("converts markdown to test object", async () => {
      const test = parseMdTest(
        `
  # User can log in with username and email validation

  User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.
  
  ## Steps
  
  - Go to (login screen)
  - Enter email address into (username field)
  - Click (log in via email button)
  - Check the email, open the received email and click the login link
  - Observe that you are now shown as logged in
  
  ## Links
  
  - [Start page](http://localhost:3000/)
  - [Docs](http://docs.testmatic.com/page/login-email)
  - [Task](http://tasks.testmatic.com/task-002)
  
  ## Tags
  
  - Log in flow        
    `.trim(),
        {},
        {}
      );

      expect(test).toEqual(MOCK_TEST);
    });

    it("maps existing tags where available", async () => {
      const test = parseMdTest(
        `
  # User can log in with username and email validation

  User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.
  
  ## Steps
  
  - Go to (login screen)
  - Enter email address into (username field)
  - Click (log in via email button)
  - Check the email, open the received email and click the login link
  - Observe that you are now shown as logged in
  
  ## Links
  
  - [Start page](http://localhost:3000/)
  - [Docs](http://docs.testmatic.com/page/login-email)
  - [Task](http://tasks.testmatic.com/task-002)
  
  ## Tags
  
  - Log in flow        
    `.trim(),
        {
          log_in_flow: MOCK_TAG_LOGIN_FLOW,
          login_screen: MOCK_TAG_LOGIN_SCREEN,
        },
        {}
      );

      expect(test).toEqual(MOCK_TEST_WITH_MAPPED_TAGS);
    });
  });
});
