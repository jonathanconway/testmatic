import { TESTMATIC_ROOT_DIRNAME } from "../../const";

export function projectPathGet() {
  return `${process.cwd()}/${TESTMATIC_ROOT_DIRNAME}`;
}
