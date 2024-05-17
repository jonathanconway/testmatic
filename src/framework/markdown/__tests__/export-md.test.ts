import { MOCK_TAGS, MOCK_TESTS, createProjectView } from "../../core";
import { exportMd } from "../export-md";

describe("export-md", () => {
  describe("exportMd", () => {
    it("exports project to set of md files and contents", () => {
      const output = exportMd(
        createProjectView({
          tests: MOCK_TESTS,
          tags: MOCK_TAGS,
        })
      );

      expect(output).toEqual({
        tests: {
          user_can_log_in_with_username_and_email_validation:
            "# User can log in with username and email validation\n" +
            "\n" +
            "User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.\n" +
            "\n" +
            "## Steps\n" +
            "\n" +
            "- Go to (login screen)\n" +
            "- Enter email address into (username field)\n" +
            "- Click (log in via email button)\n" +
            "- Check the email, open the received email and click the login link\n" +
            "- Observe that you are now shown as logged in\n" +
            "\n" +
            "## Links\n" +
            "\n" +
            "- [Start page](http://localhost:3000/)\n" +
            "- [Docs](http://docs.testmatic.com/page/login-email)\n" +
            "- [Task](http://tasks.testmatic.com/task-002)\n" +
            "\n" +
            "## Tags\n" +
            "\n" +
            "- Log in flow",
        },
        tags: {
          log_in_flow:
            "# Log in flow\n" +
            "\n" +
            "Type: Flow\n" +
            "\n" +
            "This flow covers an existing user logging into the website.\n" +
            "\n" +
            "## Notes\n" +
            "\n" +
            "- It assumes the user already has an account\n" +
            "- It assumes the user is accessing the website from a supported location\n" +
            "\n" +
            "## Links\n" +
            "\n" +
            "- [Docs](http://docs.testmatic.com/flows/login)",
        },
      });
    });
  });
});
