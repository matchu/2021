import { readLinesFromFile } from "./util";

// TODO: If we were gonna reuse this code, I think I might just split this into
//       two copy-pasted functions. Writing them together at first was
//       convenient, but once I extracted the helper functions it became less
//       relevant, and I'd rather have the API parity with the oxygen/co2
//       functions.
export function computeGammaAndEpsilonRates(reportValues) {
  const width = getReportValueWidth(reportValues);

  let gammaRateBinary = "";
  let epsilonRateBinary = "";
  for (let bitPosition = 0; bitPosition < width; bitPosition++) {
    let { zeroCount, oneCount } = countBitsAtPosition(
      reportValues,
      bitPosition
    );
    if (zeroCount > oneCount) {
      gammaRateBinary += "0";
      epsilonRateBinary += "1";
    } else if (oneCount > zeroCount) {
      gammaRateBinary += "1";
      epsilonRateBinary += "0";
    } else {
      throw new Error(
        `there were an equal number of zeroes and ones at position ${bitPosition}`
      );
    }
  }

  return {
    gammaRate: parseInt(gammaRateBinary, 2),
    epsilonRate: parseInt(epsilonRateBinary, 2),
  };
}

export function computeOxygenGeneratorRating(reportValues) {
  const width = getReportValueWidth(reportValues);
  let matchingReportValues = reportValues;

  for (
    let bitPosition = 0;
    bitPosition < width && matchingReportValues.length > 1;
    bitPosition++
  ) {
    const { zeroCount, oneCount } = countBitsAtPosition(
      matchingReportValues,
      bitPosition
    );
    if (zeroCount > oneCount) {
      matchingReportValues = matchingReportValues.filter(
        (valueBinaryText) => valueBinaryText[bitPosition] === "0"
      );
    } else {
      matchingReportValues = matchingReportValues.filter(
        (valueBinaryText) => valueBinaryText[bitPosition] === "1"
      );
    }
  }

  if (matchingReportValues.length === 0) {
    // This can't happen, right?
    throw new Error(`there are no matching oxygen generator rating values`);
  }

  return parseInt(matchingReportValues[0], 2);
}

export function computeCO2ScrubberRating(reportValues) {
  const width = getReportValueWidth(reportValues);
  let matchingReportValues = reportValues;

  for (
    let bitPosition = 0;
    bitPosition < width && matchingReportValues.length > 1;
    bitPosition++
  ) {
    const { zeroCount, oneCount } = countBitsAtPosition(
      matchingReportValues,
      bitPosition
    );
    if (oneCount < zeroCount) {
      matchingReportValues = matchingReportValues.filter(
        (valueBinaryText) => valueBinaryText[bitPosition] === "1"
      );
    } else {
      matchingReportValues = matchingReportValues.filter(
        (valueBinaryText) => valueBinaryText[bitPosition] === "0"
      );
    }
  }

  if (matchingReportValues.length === 0) {
    // This can't happen, right?
    throw new Error(`there are no matching CO2 scrubber rating values`);
  }

  return parseInt(matchingReportValues[0], 2);
}

function getReportValueWidth(reportValues) {
  if (reportValues.length === 0) {
    throw new Error(`report must not be empty`);
  }

  const width = reportValues[0].length;
  const valueWithWrongWidth = reportValues.find((v) => v.length !== width);
  if (valueWithWrongWidth != null) {
    throw new Error(
      `all report values must have the same length, but found ` +
        `${JSON.stringify(reportValues[0])} and ` +
        `${JSON.stringify(valueWithWrongWidth)}`
    );
  }
  return width;
}

function countBitsAtPosition(reportValues, bitPosition) {
  let zeroCount = 0;
  let oneCount = 0;
  for (const valueBinaryText of reportValues) {
    const bitAtPosition = valueBinaryText[bitPosition];
    if (bitAtPosition === "0") {
      zeroCount += 1;
    } else if (bitAtPosition === "1") {
      oneCount += 1;
    } else {
      throw new Error(
        `unexpected bit value ${JSON.stringify(bitAtPosition)} in ` +
          `${JSON.stringify(valueBinaryText)}`
      );
    }
  }
  return { zeroCount, oneCount };
}

export async function readDiagnosticReportFile(path) {
  return await readLinesFromFile(path);
}
