import { RunResult } from "./run-result";

export function runResultEmoji(runResult?: RunResult) {
  switch (runResult) {
    case "failed":
      return "❌";
    case "mixed":
      return "⚠️";
    case "passed":
      return "✅";
    default:
      return "⚪️";
  }
}
