import { ProjectView, Test } from "../../core";
import { getSwitch, getSwitchValue } from "../switch.utils";

const SWITCH_NAME_FILTER_TAG = "tag";

export function filterByArgsTag(
  args: readonly string[],
  tests: readonly Test[],
  { tagsByName }: ProjectView
): Array<Test> {
  let filteredTests = [...tests];

  const tagFilterSwitches = getSwitch(args, SWITCH_NAME_FILTER_TAG);

  for (const tagFilterSwitch of tagFilterSwitches) {
    const tagFilterValue = getSwitchValue(SWITCH_NAME_FILTER_TAG)(
      tagFilterSwitch
    );

    if (!tagFilterValue) {
      continue;
    }

    filteredTests = filteredTests.filter(testByTag(tagFilterValue));
  }

  return filteredTests;
}

function testByTag(tagFilterValue: string) {
  return (test: Test) =>
    test.tags.some((tag) => tag.name === tagFilterValue) ||
    test.steps.some((step) =>
      step.tags.some((tag) => tag.name === tagFilterValue)
    );
}
