import {
  computeCO2ScrubberRating,
  computeGammaAndEpsilonRates,
  computeOxygenGeneratorRating,
  readDiagnosticReportFile,
} from "./day3";

describe(computeGammaAndEpsilonRates, () => {
  it("solves the simple example", () => {
    const reportValues = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];
    expect(computeGammaAndEpsilonRates(reportValues)).toEqual({
      gammaRate: 22,
      epsilonRate: 9,
    });
  });
});

describe(computeOxygenGeneratorRating, () => {
  it("solves the simple example", () => {
    const reportValues = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];
    expect(computeOxygenGeneratorRating(reportValues)).toEqual(23);
  });
});

describe(computeCO2ScrubberRating, () => {
  it("solves the simple example", () => {
    const reportValues = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];
    expect(computeCO2ScrubberRating(reportValues)).toEqual(10);
  });
});

describe("day3.js", () => {
  it("solves puzzle 1", async () => {
    const reportValues = await readDiagnosticReportFile(
      new URL("../input/day3.txt", import.meta.url)
    );
    const { gammaRate, epsilonRate } =
      computeGammaAndEpsilonRates(reportValues);
    const powerConsumption = gammaRate * epsilonRate;
    expect(powerConsumption).toMatchInlineSnapshot(`3687446`);
  });

  it("solves puzzle 2", async () => {
    const reportValues = await readDiagnosticReportFile(
      new URL("../input/day3.txt", import.meta.url)
    );
    const oxygenGeneratorRating = computeOxygenGeneratorRating(reportValues);
    const co2ScrubberRating = computeCO2ScrubberRating(reportValues);
    const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
    expect(lifeSupportRating).toMatchInlineSnapshot(`4406844`);
  });
});
