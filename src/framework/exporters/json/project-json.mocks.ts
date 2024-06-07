import { ProjectJSON } from "./project-json";

export const MOCK_PROJECT_JSON_EMPTY: ProjectJSON = {
  tests: {},
  tags: {},
};

export const MOCK_PROJECT_JSON: ProjectJSON = {
  tests: {
    user_can_log_in_with_username_and_email_validation: {
      title: "User can log in with username and email validation",
      name: "user_can_log_in_with_username_and_email_validation",
      description:
        "User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.",
      links: [
        { href: "http://localhost:3000/", title: "Start page" },
        { href: "http://docs.testmatic.com/page/login-email", title: "Docs" },
        { href: "http://tasks.testmatic.com/task-002", title: "Task" },
      ],
      stepTexts: [
        "Go to (login screen)",
        "Enter email address into (username field)",
        "Click (log in via email button)",
        "Check the email, open the received email and click the login link",
        "Observe that you are now shown as logged in",
      ],
      tagNames: ["log_in_flow"],
      runs: [],
    },
  },
  tags: {
    log_in_flow: {
      name: "log_in_flow",
      title: "Log in flow",
      tagType: "flow",
      description:
        "This flow covers an existing user logging into the website.\n\n## Notes\n\n- It assumes the user already has an account\n- It assumes the user is accessing the website from a supported location",
      links: [{ href: "http://docs.testmatic.com/flows/login", title: "Docs" }],
    },
    login_screen: {
      name: "login_screen",
      title: "Login screen",
      description: "Screen where user can login to the application",
      links: [{ href: "http://localhost:3000/login", title: "Login page" }],
    },
    username_field: {
      name: "username_field",
      title: "Username field",
      links: [],
    },
    log_in_via_email_button: {
      name: "log_in_via_email_button",
      title: "Log in via email button",
      links: [],
    },
  },
};
