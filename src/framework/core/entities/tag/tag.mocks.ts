import { Tag } from "./tag";

export const MOCK_TAG_LOGIN_FLOW = {
  type: "tag",
  title: "Log in flow",
  name: "log_in_flow",
  tagType: "flow",
  links: [
    {
      href: "http://docs.testmatic.com/flows/login",
      title: "Docs",
    },
  ],
  description: `
This flow covers an existing user logging into the website.

## Notes

- It assumes the user already has an account
- It assumes the user is accessing the website from a supported location
`.trim(),
} as Tag;

export const MOCK_TAG = MOCK_TAG_LOGIN_FLOW as Tag;

export const MOCK_TAG_TWO = {
  type: "tag",
  name: "tag_one",
  title: "Tag one",
  links: [],
} as Tag;

export const MOCK_TAG_LOGIN_SCREEN = {
  type: "tag",
  name: "login_screen",
  title: "Login screen",
  links: [
    {
      href: "http://localhost:3000/login",
      title: "Login page",
    },
  ],
  description: "Screen where user can login to the application",
} as Tag;

export const MOCK_TAG_USERNAME_FIELD = {
  type: "tag",
  name: "username_field",
  links: [],
  title: "Username field",
} as Tag;

export const MOCK_TAG_LOGIN_VIA_EMAIL_BUTTON = {
  type: "tag",
  name: "log_in_via_email_button",
  links: [],
  title: "Log in via email button",
} as Tag;

export const MOCK_TAGS = [
  MOCK_TAG_LOGIN_FLOW,
  MOCK_TAG,
  MOCK_TAG_LOGIN_SCREEN,
  MOCK_TAG_USERNAME_FIELD,
  MOCK_TAG_LOGIN_VIA_EMAIL_BUTTON,
];

export const MOCK_NEW_TAG_ONE = {
  type: "tag",
  name: "tag_new_one",
  title: "Tag new one",
  links: [],
} as Tag;

export const MOCK_NEW_TAG_TWO = {
  type: "tag",
  name: "tag_new_two",
  title: "Tag new two",
  links: [],
} as Tag;

export const MOCK_NEW_TAG_THREE = {
  type: "tag",
  name: "tag_new_three",
  title: "Tag new three",
  links: [],
} as Tag;

export const MOCK_NEW_TAG_FOUR = {
  type: "tag",
  name: "tag_new_four",
  title: "Tag new four",
  links: [],
} as Tag;

export const MOCK_NEW_TAGS = [
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_TWO,
  MOCK_NEW_TAG_THREE,
];
