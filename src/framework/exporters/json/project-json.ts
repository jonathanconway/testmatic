import fromPairs from "lodash/fromPairs";

import {
  Link,
  ProjectView,
  Run,
  RunResult,
  Step,
  Tag,
  Test,
  createProjectView,
  createTagFromName,
  parseTagNames,
} from "../../core";
import { Timestamp } from "../../core/timestamp";

export interface ProjectJSON {
  readonly tests: Record<string, ProjectJSONTest>;
  readonly tags: Record<string, ProjectJSONTag>;
}

export function convertProjectToProjectJSON(project: ProjectView): ProjectJSON {
  return {
    tests: fromPairs(
      project.tests
        .map(convertTestToProjectJSONTest)
        .map((test) => [test.name, test])
    ),
    tags: fromPairs(
      project.tags.map(convertTagToProjectJSONTag).map((tag) => [tag.name, tag])
    ),
  };
}

export interface ProjectJSONTest {
  readonly title: string;
  readonly name: string;
  readonly steps: ReadonlyArray<string>;
  readonly description?: string;
  readonly links: readonly ProjectJSONLink[];
  readonly tags: readonly string[];
  readonly runs: readonly ProjectJSONRun[];
}

function convertTestToProjectJSONTest(test: Test): ProjectJSONTest {
  return {
    title: test.title,
    name: test.name,
    description: test.description,
    links: test.links.map(convertLinkToProjectJSONLink),
    steps: test.steps.map((step) => step.text),
    tags: test.tags.map((tag) => tag.name),
    runs: test.runs.map(convertRunToProjectRunJSON),
  };
}

export interface ProjectJSONLink {
  readonly href: string;
  readonly title?: string;
}

function convertLinkToProjectJSONLink(link: Link): ProjectJSONLink {
  return {
    href: link.href,
    title: link.title,
  };
}

export interface ProjectJSONTag {
  readonly name: string;
  readonly title: string;
  readonly type?: string;
  readonly description?: string;
  readonly links: readonly ProjectJSONLink[];
}

function convertTagToProjectJSONTag(tag: Tag): ProjectJSONTag {
  return {
    name: tag.name,
    title: tag.title,
    type: tag.type,
    description: tag.description,
    links: tag.links.map(convertLinkToProjectJSONLink),
  };
}

export interface ProjectJSONRun {
  readonly id: string;
  readonly dateTime: Timestamp;
  readonly testName: string;
  readonly result: RunResult;
  readonly links: readonly ProjectJSONLink[];
}

function convertRunToProjectRunJSON(run: Run): ProjectJSONRun {
  return {
    id: run.id,
    dateTime: run.dateTime,
    testName: test.name,
    result: run.result,
    links: run.links.map(convertLinkToProjectJSONLink),
  };
}

export function parseProjectJSON(json: string): ProjectJSON {
  return JSON.parse(json) as ProjectJSON;
}

export function convertProjectJSONToProject(
  projectJSON: ProjectJSON
): ProjectView {
  const tags = Object.values(projectJSON.tags).map(convertProjectJSONTagToTag);
  const tests = Object.values(projectJSON.tests).map(
    convertProjectJSONTestToTest(projectJSON)
  );

  return createProjectView({
    tests,
    tags,
  });
}

export function convertProjectJSONTestToTest(projectJSON: ProjectJSON) {
  return (projectJSONTest: ProjectJSONTest): Test => {
    return {
      name: projectJSONTest.name,
      title: projectJSONTest.title,
      description: projectJSONTest.description,
      steps: projectJSONTest.steps.map(
        convertProjectJSONStepToStep(projectJSON)
      ),
      runs: projectJSONTest.runs.map(convertProjectJSONRunToRun),
      links: projectJSONTest.links.map(convertProjectJSONLinkToLink),
      tags: projectJSONTest.tags.map(
        convertProjectJSONTestTagToTag(projectJSON)
      ),
    };
  };
}

export function convertProjectJSONStepToStep(projectJSON: ProjectJSON) {
  return (projectJSONStep: string): Step => {
    return {
      text: projectJSONStep,
      tags: parseTagNames(projectJSONStep)
        .map(convertProjectJSONTestTagToTag(projectJSON))
        .map(convertProjectJSONTagToTag),
    };
  };
}

function convertProjectJSONTestTagToTag(projectJSON: ProjectJSON) {
  return (tagName: string): Tag =>
    projectJSON.tags[tagName] ?? createTagFromName(tagName);
}

export function convertProjectJSONTagToTag(
  projectJSONTag: ProjectJSONTag
): Tag {
  return {
    name: projectJSONTag.name,
    title: projectJSONTag.title,
    type: projectJSONTag.type,
    description: projectJSONTag.description,
    links: projectJSONTag.links,
  };
}

export function convertProjectJSONLinkToLink(
  projectJSONRun: ProjectJSONLink
): Link {
  return {
    href: projectJSONRun.href,
    title: projectJSONRun.title,
  };
}

export function convertProjectJSONRunToRun(
  projectJSONRun: ProjectJSONRun
): Run {
  return {
    id: projectJSONRun.id,
    dateTime: projectJSONRun.dateTime,
    result: projectJSONRun.result,
    links: Object.values(projectJSONRun.links),
  };
}
