import { DirFileTree } from "../files";

export const MOCK_RUNS_DIR_FILE_TREE = {
  user_can_log_in_with_username_and_email_validation: {
    "2024-04-30_20-45": {
      "2024-04-30_20-45.md": `
# Materials editor keeps material cost totals group cost totals and a grand cost total - Run 30/3/2024 20:45

Result: Passed

## Links
`,
      "foo.jpg": undefined,
    },
    "2024-04-30_20-43": {
      "2024-04-30_20-43.md": `
# Materials editor shows a list of grouped materials with quantity inputs - Run 30/3/2024 20:43

Result: Passed

## Links
`,
      "bar.jpg": undefined,
    },
  },
  user_can_request_password_reset_by_providing_email: {
    "2024-04-30_20-48": {
      "2024-04-30_20-48.md": `
# Materials editor keeps material cost totals group cost totals and a grand cost total - Run 30/3/2024 20:48

Result: -

## Links
`,
      "baz.jpg": undefined,
    },
  },
} as DirFileTree;
