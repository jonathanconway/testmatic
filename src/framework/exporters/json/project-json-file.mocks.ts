import { ProjectJSON } from "./project-json";

export const MOCK_PROJECT_JSON_FILE_EMPTY: ProjectJSON = {
  tests: {},
  tags: {},
};

export const MOCK_PROJECT_JSON_FILE: ProjectJSON = {
  tests: {
    test_one: {
      title: "test one",
      name: "test_one",
      links: [],
      steps: ["step_one", "step_two"],
      tags: [],
      runs: [],
    },
    test_two: {
      title: "test two",
      name: "test_two",
      links: [],
      steps: ["step_one", "step_two"],
      tags: ["tag_one"],
      runs: [],
    },
    test_three: {
      title: "test three",
      name: "test_three",
      links: [],
      steps: ["step_one", "step_three"],
      tags: [],
      runs: [],
    },
  },
  tags: {
    tag_one: {
      name: "tag_one",
      title: "Tag one",
      links: [],
      type: "tag_type_one",
      description: "description",
    },
    tag_two: {
      name: "tag_two",
      title: "Tag two",
      links: [],
      type: "tag_type_two",
      description: "description",
    },
  },
};
