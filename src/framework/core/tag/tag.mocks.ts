export const MOCK_TAG_LOGIN_FLOW = {
  title: "Log in flow",
  name: "log_in_flow",
  type: "flow",
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
};

export const MOCK_TAG = MOCK_TAG_LOGIN_FLOW;

export const MOCK_TAGS = [MOCK_TAG];

export const MOCK_TAG_TWO = {
  name: "tag_one",
  title: "Tag one",
  links: [],
};

export const MOCK_TAG_LOGIN_SCREEN = {
  name: "login_screen",
  title: "Login screen",
  links: [
    {
      href: "http://localhost:3000/login",
      text: "Login page",
    },
  ],
  description: "Screen where user can login to the application",
};

export const MOCK_NEW_TAG_ONE = {
  name: "tag_new_one",
  title: "Tag new one",
  links: [],
};

export const MOCK_NEW_TAG_TWO = {
  name: "tag_new_two",
  title: "Tag new two",
  links: [],
};

export const MOCK_NEW_TAG_THREE = {
  name: "tag_new_three",
  title: "Tag new three",
  links: [],
};

export const MOCK_NEW_TAG_FOUR = {
  name: "tag_new_four",
  title: "Tag new four",
  links: [],
};

export const MOCK_NEW_TAGS = [
  MOCK_NEW_TAG_ONE,
  MOCK_NEW_TAG_TWO,
  MOCK_NEW_TAG_THREE,
];
