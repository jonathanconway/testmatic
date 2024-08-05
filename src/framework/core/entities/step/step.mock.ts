export const MOCK_STEP = {
  text: "Go to (login screen)",
  tags: [
    {
      type: "tag",
      name: "login_screen",
      links: [],
      title: "Login screen",
    },
  ],
};

export const MOCK_STEPS = [
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
];
