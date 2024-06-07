import { DirFileTree } from "../files";

import { ProjectViewDirFileTree } from "./export-md";
import { MOCK_RUNS_DIR_FILE_TREE } from "./md-run.mocks";

export const MOCK_PROJECT_DIR_TREE = {
  tests: {
    "user_can_log_in_with_username_and_email_validation.md":
      "# User can log in with username and email validation\n\nUser should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.\n\n## Steps\n\n- Go to (login screen)\n- Enter email address into (username field)\n- Click (log in via email button)\n- Check the email, open the received email and click the login link\n- Observe that you are now shown as logged in\n\n## Links\n\n- [Start page](http://localhost:3000/)\n- [Docs](http://docs.testmatic.com/page/login-email)\n- [Task](http://tasks.testmatic.com/task-002)\n\n## Tags\n\n- Log in flow",
  },
  tags: {
    "log_in_flow.md":
      "# Log in flow\n\nType: Flow\n\nThis flow covers an existing user logging into the website.\n\n## Notes\n\n- It assumes the user already has an account\n- It assumes the user is accessing the website from a supported location\n\n## Links\n\n- [Docs](http://docs.testmatic.com/flows/login)",
    "login_screen.md":
      "# Login screen\n\nScreen where user can login to the application\n\n## Links\n\n- [Login page](http://localhost:3000/login)",
    "username_field.md": "# Username field\n\n## Links",
    "log_in_via_email_button.md": "# Log in via email button\n\n## Links",
  },
  runs: MOCK_RUNS_DIR_FILE_TREE,
} as DirFileTree & ProjectViewDirFileTree;
