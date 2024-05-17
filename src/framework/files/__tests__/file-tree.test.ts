import { getFileTree } from "../file-tree";

describe("file-tree", () => {
  describe("getFileTree", () => {
    it("returns a map of filenames to file contents in the given folder for the given file extensions", () => {
      const result = getFileTree(`${__dirname}/../../../.testmatic/tests`, [
        "md",
      ]);

      expect(result).toEqual({
        "user_can_log_in_with_username_and_email_validation.md":
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
          "- Log in flow\n",
        "user_can_log_in_with_username_and_password.md":
          "# User can log in with username and password\n" +
          "\n" +
          "User should be able to log in.\n" +
          "\n" +
          "## Steps\n" +
          "\n" +
          "- Go to (login screen)\n" +
          "- Enter username and password\n" +
          "- Click (submit button)\n" +
          "- Observe that you are now shown as logged in\n" +
          "\n" +
          "## Links\n" +
          "\n" +
          "- [Start page](http://localhost:3000/)\n" +
          "- [Docs](http://docs.testmatic.com/page/login)\n" +
          "- [Task](http://tasks.testmatic.com/task-001)\n" +
          "\n" +
          "## Tags\n" +
          "\n" +
          "- Log in flow\n",
        "user_cannot_log_in_from_an_unsupported_region.md":
          "# User cannot log in from an unsupported region\n" +
          "\n" +
          "We do not allow any users to log in from any unsupported regions.\n" +
          "\n" +
          "## Steps\n" +
          "\n" +
          "- Simulate (unsupported region)\n" +
          "- Go to (login screen)\n" +
          "- Try to log in by either username and password or email verification\n" +
          "- Observe that you are not logged in but an (unsupported region error) is shown\n" +
          "\n" +
          "## Links\n" +
          "\n" +
          "- [Start page](http://localhost:3000/)\n" +
          "- [Docs](http://docs.testmatic.com/page/login)\n" +
          "- [Design](http://figma.testmatic.com/login-unsupported-region)\n" +
          "- [Task](http://tasks.testmatic.com/task-003)\n" +
          "\n" +
          "## Tags\n" +
          "\n" +
          "- Log in flow\n" +
          "- Region support\n",
        "user_is_logged_out_if_switched_to_unsupported_region.md":
          "# User is logged out if switched to unsupported region\n" +
          "\n" +
          "We do not allow any users who are logged in to continue using the application from any unsupported regions.\n" +
          "\n" +
          "- Go to (login screen)\n" +
          "- Log in by either username and password or email verification\n" +
          "- Observe that you are now shown as logged in\n" +
          "- Simulate (unsupported region)\n" +
          "- Observe that you are logged out and an (unsupported region error) is shown\n" +
          "\n" +
          "## Links\n" +
          "\n" +
          "- [Start page](http://localhost:3000/)\n" +
          "- [Docs](http://docs.testmatic.com/page/logout)\n" +
          "- [Design](http://figma.testmatic.com/logout-unsupported-region)\n" +
          "- [Task](http://tasks.testmatic.com/task-004)\n" +
          "\n" +
          "## Tags\n" +
          "\n" +
          "- Log out flow\n" +
          "- Region support\n",
      });
    });
  });
});
