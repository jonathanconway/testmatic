// import {
//   MOCK_TESTS,
//   MOCK_TEST_LOG_IN,
//   MOCK_TEST_WITH_MAPPED_TAGS,
// } from "../../test";
// import {
//   MOCK_TAG,
//   MOCK_TAGS,
//   MOCK_TAG_LOGIN_FLOW,
//   MOCK_TAG_LOGIN_SCREEN,
// } from "../tag.mocks";
// import {
//   getStepsHavingTag,
//   getTagsHavingTest,
//   getTestsHavingTag,
// } from "../tag.utils";

// describe("tag.utils", () => {
//   describe("getTestsHavingTag", () => {
//     it("filters tests by tag", () => {
//       const result = getTestsHavingTag(MOCK_TESTS, MOCK_TAG_LOGIN_FLOW);

//       expect(result).toEqual([MOCK_TEST_LOG_IN]);
//     });
//   });

//   describe("getStepsHavingTag", () => {
//     it("filters steps by tag", () => {
//       const result = getStepsHavingTag(
//         MOCK_TEST_WITH_MAPPED_TAGS.steps,
//         MOCK_TAG_LOGIN_SCREEN
//       );

//       expect(result.length).toBe(1);
//       expect(result[0]).toEqual(
//         expect.objectContaining(MOCK_TEST_WITH_MAPPED_TAGS.steps[0])
//       );
//     });
//   });

//   describe("getTagsHavingTest", () => {
//     it("filters steps by tag", () => {
//       const result = getTagsHavingTest(MOCK_TEST_WITH_MAPPED_TAGS, MOCK_TAGS);

//       expect(result.length).toBe(1);
//       expect(result[0]).toEqual(expect.objectContaining(MOCK_TAG));
//     });
//   });
// });
