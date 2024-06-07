import {
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_THREE,
  MOCK_NEW_TAG_TWO,
  MOCK_TAG,
  MOCK_TAG_LOGIN_FLOW,
  MOCK_TAG_LOGIN_SCREEN,
  MOCK_TAG_LOGIN_VIA_EMAIL_BUTTON,
  MOCK_TAG_TWO,
  MOCK_TAG_USERNAME_FIELD,
} from "../tag/tag.mocks";

import { Test } from "./test";

export const MOCK_TEST_LOG_IN = {
  type: "test",
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [
        {
          type: "tag",
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
          type: "tag",
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
          type: "tag",
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
      type: "tag",
      links: [],
      name: "log_in_flow",
      title: "Log in flow",
    },
  ],
  runs: [],
} as Test;

export const MOCK_TEST = MOCK_TEST_LOG_IN as Test;

export const MOCK_TEST_PASSWORD_RESET = {
  type: "test",
  name: "user_can_request_password_reset_by_providing_email",
  title: "User can request password reset by providing email",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [
        {
          type: "tag",
          name: "login_screen",
          links: [],
          title: "Login screen",
        },
      ],
    },
    {
      text: "Click (reset password link)",
      tags: [
        {
          type: "tag",
          name: "reset_password_link",
          links: [],
          title: "Reset password link",
        },
      ],
    },
    {
      text: "Enter email address into (username field)",
      tags: [
        {
          type: "tag",
          name: "username_field",
          links: [],
          title: "Username field",
        },
      ],
    },
    {
      text: "Click (reset password button)",
      tags: [
        {
          type: "tag",
          name: "reset_password_button",
          links: [],
          title: "Reset password button",
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
    "User should be able to reset their password by entering the email address and confirm it by following a link in an email received in that email account.",
  tags: [
    {
      type: "tag",
      links: [],
      name: "log_in_flow",
      title: "Log in flow",
    },
  ],
  runs: [],
} as Test;

export const MOCK_TEST_WITH_MAPPED_TAGS = {
  type: "test",
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [MOCK_TAG_LOGIN_SCREEN],
    },
    {
      text: "Enter email address into (username field)",
      tags: [MOCK_TAG_USERNAME_FIELD],
    },
    {
      text: "Click (log in via email button)",
      tags: [MOCK_TAG_LOGIN_VIA_EMAIL_BUTTON],
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
} as Test;

export const MOCK_TEST_WITH_MAPPED_TAGS_2 = {
  type: "test",
  name: "user_can_log_in_with_username_and_email_validation",
  title: "User can log in with username and email validation",
  steps: [
    {
      text: "Go to (login screen)",
      tags: [MOCK_TAG_LOGIN_SCREEN],
    },
    {
      text: "Enter email address into (username field)",
      tags: [MOCK_TAG_USERNAME_FIELD],
    },
    {
      text: "Click (log in via email button)",
      tags: [MOCK_TAG_LOGIN_VIA_EMAIL_BUTTON],
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
} as Test;

export const MOCK_TESTS = [MOCK_TEST_WITH_MAPPED_TAGS];

export const MOCK_CREATE_TEST_PARAMS = {
  title: "Mock test",
  steps: ["step one", "step two", "step three (with tag)"],
  description: "Mock test description",
};

export const MOCK_NEW_TEST = {
  type: "test",
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
      text: `mock new test (log_in_flow) step three`,
      tags: [MOCK_TAG],
    },
  ],
  tags: [MOCK_NEW_TAG_THREE, MOCK_TAG_TWO],
  links: [],
  runs: [],
} as Test;
