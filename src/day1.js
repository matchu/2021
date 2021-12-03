import { readLinesFromFile } from "./util";

export function countDepthIncreases(depths) {
  let numIncreases = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      numIncreases += 1;
    }
  }
  return numIncreases;
}

export function computeDepthSumWindows(depths) {
  const windows = [];
  for (let i = 2; i < depths.length; i++) {
    windows.push(depths[i - 2] + depths[i - 1] + depths[i]);
  }
  return windows;
}

export async function readDepthsFile(path) {
  const depthTexts = await readLinesFromFile(path);
  const depths = depthTexts.map((text) => parseInt(text));
  return depths;
}
