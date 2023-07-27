export function convertImportedTestMdToTitleAndSteps(importedTestMd: string) {
  const lines = importedTestMd.split("\n");
  const titleLine = lines.find((line) => line.trim().startsWith("#"));
  const title = titleLine.replaceAll("#", "").trim();

  const stepLines = lines.filter(
    (line) =>
      line.trim().length > 0 && !isNaN(Number(line.trim().split(".")[0]))
  );
  const steps = stepLines.map((stepLine) => stepLine.split(".")[1].trim());

  return {
    title,
    steps,
  };
}
