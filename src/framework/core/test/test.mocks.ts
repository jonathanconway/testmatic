import {
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_THREE,
  MOCK_NEW_TAG_TWO,
  MOCK_TAG,
  MOCK_TAG_LOGIN_FLOW,
  MOCK_TAG_TWO,
} from "../tag";

export const MOCK_TEST = {
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [
        {
          name: "login_screen",
          links: [],
          title: "Login screen",
        },
      ],
    },
    {
      text: "Enter email address into (username field)",
      tags: [
        {
          name: "username_field",
          links: [],
          title: "Username field",
        },
      ],
    },
    {
      text: "Click (log in via email button)",
      tags: [
        {
          name: "log_in_via_email_button",
          links: [],
          title: "Log in via email button",
        },
      ],
    },
    {
      text: "Check the email, open the received email and click the login link",
      tags: [],
    },
    {
      text: "Observe that you are now shown as logged in",
      tags: [],
    },
  ],
  links: [
    {
      href: "http://localhost:3000/",
      title: "Start page",
    },
    {
      href: "http://docs.testmatic.com/page/login-email",
      title: "Docs",
    },
    {
      href: "http://tasks.testmatic.com/task-002",
      title: "Task",
    },
  ],
  description:
    "User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.",
  tags: [
    {
      links: [],
      name: "log_in_flow",
      title: "Log in flow",
    },
  ],
  runs: [],
};

export const MOCK_TEST_WITH_MAPPED_TAGS = {
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [
        {
          name: "login_screen",
          title: "Login screen",
          links: [{ href: "http://localhost:3000/login", text: "Login page" }],
          description: "Screen where user can login to the application",
        },
      ],
    },
    {
      text: "Enter email address into (username field)",
      tags: [{ name: "username_field", links: [], title: "Username field" }],
    },
    {
      text: "Click (log in via email button)",
      tags: [
        {
          name: "log_in_via_email_button",
          links: [],
          title: "Log in via email button",
        },
      ],
    },
    {
      text: "Check the email, open the received email and click the login link",
      tags: [],
    },
    { text: "Observe that you are now shown as logged in", tags: [] },
  ],
  links: [
    {
      href: "http://localhost:3000/",
      title: "Start page",
    },
    {
      href: "http://docs.testmatic.com/page/login-email",
      title: "Docs",
    },
    {
      href: "http://tasks.testmatic.com/task-002",
      title: "Task",
    },
  ],
  description:
    "User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.",
  tags: [MOCK_TAG_LOGIN_FLOW],
  runs: [],
};

export const MOCK_TEST_WITH_MAPPED_TAGS_2 = {
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [
        {
          name: "login_screen",
          title: "Login screen",
          links: [{ href: "http://localhost:3000/login", text: "Login page" }],
          description: "Screen where user can login to the application",
        },
      ],
    },
    {
      text: "Enter email address into (username field)",
      tags: [{ name: "username_field", links: [], title: "Username field" }],
    },
    {
      text: "Click (log in via email button)",
      tags: [
        {
          name: "log_in_via_email_button",
          links: [],
          title: "Log in via email button",
        },
      ],
    },
    {
      text: "Check the email, open the received email and click the login link",
      tags: [],
    },
    { text: "Observe that you are now shown as logged in", tags: [] },
  ],
  links: [
    {
      href: "http://localhost:3000/",
      title: "Start page",
    },
    {
      href: "http://docs.testmatic.com/page/login-email",
      title: "Docs",
    },
    {
      href: "http://tasks.testmatic.com/task-002",
      title: "Task",
    },
  ],
  description:
    "User should be able to log in by entering an email address and confirm it by following a link in an email received in that email account.",
  tags: [],
  runs: [],
};

export const MOCK_TESTS = [
  MOCK_TEST_WITH_MAPPED_TAGS,
  MOCK_TEST_WITH_MAPPED_TAGS_2,
];

export const MOCK_CREATE_TEST_PARAMS = {
  title: "Mock test",
  steps: ["step one", "step two", "step three (with tag)"],
  description: "Mock test description",
};

export const MOCK_NEW_TEST = {
  name: "mock_new_test",
  title: "mock new test",
  steps: [
    {
      text: "mock new test (tag one) step one",
      tags: [MOCK_NEW_TAG_ONE],
    },
    {
      text: "mock new test (tag two) step two",
      tags: [MOCK_NEW_TAG_TWO],
    },
    {
      text: `mock new test (${MOCK_TAG.name.toLowerCase()}) step three`,
      tags: [MOCK_TAG],
    },
  ],
  tags: [MOCK_NEW_TAG_THREE, MOCK_TAG_TWO],
  links: [],
  runs: [],
};
