import {
  generateTestDocs,
  generateScreenDocs,
  generateStepDocs,
  generateTokenDocs,
} from "./src/framework";
import * as tests from "./src/tests";
import * as steps from "./src/steps";
import * as tokens from "./src/tokens";

generateTestDocs(Object.values(tests));
generateScreenDocs(Object.values(tests));
generateStepDocs(Object.values(steps));
generateTokenDocs(Object.values(tokens));
